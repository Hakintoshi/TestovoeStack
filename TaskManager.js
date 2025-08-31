class TaskManager {
  constructor(maxConcurrent = 2) {
    this.maxConcurrent = maxConcurrent;
    this.tasks = new Map();
    this.seq = 0;
    this.lastSnapshotEnd = 0;
  }

  addTask(task, priority = 1, dependencies = [], timeout = null) {
    const seq = ++this.seq;
    const id = `task${seq}`;

    this.tasks.set(id, {
      id,
      seq,
      fn: task,
      priority: Number(priority) || 0,
      deps: dependencies,
      timeout: timeout,
      status: 'pending',
    });
  }

  changePriority(taskId, newPriority) {
    const searchedTask = this.tasks.get(taskId);
    if (searchedTask && searchedTask.status === 'pending') {
      searchedTask.priority = Number(newPriority) || 0;
    }
  }

  cancelTask(id) {
    const searchedTask = this.tasks.get(id);
    if (!searchedTask) return;

    if (
      searchedTask.status === 'pending' ||
      searchedTask.status === 'running'
    ) {
      searchedTask.status = 'canceled';
    }

    this.#cancelDependentsOf(id);
  }

  getStatus() {
    const map = {};
    for (const [taskId, task] of this.tasks.entries())
      map[taskId] = task.status;
    return map;
  }

  #canRun(t) {
    if (t.status !== 'pending') return false;

    return t.deps.every(depId => {
      const dep = this.tasks.get(depId);
      return dep && dep.status === 'completed';
    });
  }

  async #runOne(t, onFinally) {
    t.status = 'running';

    let timer = null;
    const core = (async () => {
      await t.fn();
    })();

    const raced = t.timeout
      ? Promise.race([
          core,
          new Promise((_, reject) => {
            timer = setTimeout(() => reject(new Error('timeout')), t.timeout);
          }),
        ])
      : core;

    try {
      await raced;
      if (t.status === 'running') t.status = 'completed';
    } catch (e) {
      if (e && e.message === 'timeout') {
        t.status = 'timeout';
        this.#cancelDependentsOf(t.id);
      } else {
        t.status = 'failed';
        t.error = e;
        this.#cancelDependentsOf(t.id);
      }
    } finally {
      if (timer) clearTimeout(timer);
      onFinally();
    }
  }

  #cancelDependentsOf(id) {
    for (const t of this.tasks.values()) {
      if (t.status === 'pending' && t.deps.includes(id)) {
        t.status = 'canceled';
        this.#cancelDependentsOf(t.id);
      }
    }
  }

  async executeTasks() {
    const batchStart = this.lastSnapshotEnd + 1;
    const batchEnd = this.seq;
    this.lastSnapshotEnd = batchEnd;

    const batch = Array.from(this.tasks.values()).filter(
      t => t.status === 'pending' && t.seq >= batchStart && t.seq <= batchEnd
    );

    if (batch.length === 0) return;

    let running = 0;

    return await new Promise((resolve, reject) => {
      const tryRun = () => {
        const runnable = batch
          .filter(t => this.#canRun(t))
          .sort((a, b) => b.priority - a.priority);

        while (running < this.maxConcurrent && runnable.length > 0) {
          const t = runnable.shift();
          running++;
          this.#runOne(t, () => {
            running--;
            tick();
          });
        }
      };

      const isBatchDone = () =>
        batch.every(t =>
          ['completed', 'failed', 'timeout', 'canceled'].includes(t.status)
        );

      const tick = () => {
        if (isBatchDone()) {
          const failed = batch.filter(
            t => t.status === 'failed' || t.status === 'timeout'
          );
          if (failed.length > 0) {
            reject(new Error(`${failed[0].id} ${failed[0].status}`));
          } else {
            resolve();
          }
          return;
        }
        tryRun();
      };

      tick();
    });
  }
}

const taskManager = new TaskManager(2);

taskManager.addTask(
  async () => {
    console.log('Выполнение задачи 1');
    await new Promise(r => setTimeout(r, 2000));
    console.log('Задача 1 завершена');
  },
  5,
  [],
  1000
);

taskManager.addTask(
  async () => {
    console.log('Выполнение задачи 2');
    await new Promise(r => setTimeout(r, 1000));
    console.log('Задача 2 завершена');
  },
  1,
  ['task1']
);

taskManager.addTask(
  async () => {
    console.log('Выполнение задачи 3');
    await new Promise(r => setTimeout(r, 500));
    console.log('Задача 3 завершена');
  },
  3,
  ['task2']
);

taskManager.addTask(
  async () => {
    console.log('Выполнение задачи 4');
    await new Promise(r => setTimeout(r, 3000));
    console.log('Задача 4 завершена');
  },
  1,
  ['task2', 'task3']
);

taskManager
  .executeTasks()
  .then(() => {
    console.log('Все задачи выполнены');
    console.log('Статус задач после выполнения:', taskManager.getStatus());
  })
  .catch(error => {
    console.error('Ошибка при выполнении задач:', error);
  });

const intervalId = setInterval(() => {
  console.log('Текущий статус:', taskManager.getStatus());
  if (
    Object.values(taskManager.getStatus()).every(s =>
      ['completed', 'failed', 'canceled', 'timeout'].includes(s)
    )
  ) {
    clearInterval(intervalId);
  }
}, 500);

taskManager.addTask(
  async () => {
    console.log('Выполнение задачи 5');
    await new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Ошибка в задаче 5')), 1500)
    );
  },
  2,
  []
);

taskManager.addTask(
  async () => {
    console.log('Выполнение задачи 6');
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Задача 6 завершена');
  },
  1,
  []
);

taskManager.addTask(
  async () => {
    console.log('Выполнение задачи 7');
    await new Promise(resolve => setTimeout(resolve, 2500));
    console.log('Задача 7 завершена');
  },
  2,
  ['task5']
);

taskManager
  .executeTasks()
  .then(() => {
    console.log('Все дополнительные задачи выполнены');
    console.log(
      'Статус задач после выполнения дополнительных задач:',
      taskManager.getStatus()
    );
  })
  .catch(error => {
    console.error('Ошибка при выполнении дополнительных задач:', error);
  });
