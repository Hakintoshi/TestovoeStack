const tableData = [
  { id: 1, info: { company: 'ООО "Вектор"', directorName: 'Иванов И.И.', phoneNumber: '79002369912' }},
  { id: 2, info: {company: 'ИП Петров П.П.', directorName: 'Петров П.П.', phoneNumber: '79004561234' }},
  { id: 3, info: { company: 'ООО "СтройГрад"', directorName: 'Сидоров С.С.', phoneNumber: '79007894561' }},
  { id: 4, info: { company: 'ИП Кузнецов К.К.', directorName: 'Кузнецов К.К.', phoneNumber: '79001239876' }},
  { id: 5, info: {company: 'ООО "Лидер"', directorName: 'Смирнов А.А.', phoneNumber: '79005673421' }},
  { id: 6, info: {company: 'ООО "Прогресс"', directorName: 'Васильев В.В.', phoneNumber: '79003458901' }},
  { id: 7, info: {company: 'ООО "Инновация"', directorName: 'Михайлов М.М.', phoneNumber: '79009871234' }},
  { id: 8, info: {company: 'ООО "Гарант"', directorName: 'Новиков Н.Н.', phoneNumber: '79001112233' }},
  { id: 9, info: {company: 'ООО "Сфера"', directorName: 'Фёдоров Ф.Ф.', phoneNumber: '79006789012' }},
  { id: 10, info: {company: 'ООО "Авангард"', directorName: 'Макаров М.М.', phoneNumber: '79008993456' }}
]

const headersTable = {
  'company': {value: 'Название', sortable: true},
  'directorName': {value: 'ФИО директора', sortable: true},
  'phoneNumber': {value: 'Номер телефона', sortable: false},
  'emptyField': {value: '', sortable: false},
}

export { tableData, headersTable }