function formatTime(timestamp){
  let date = new Date(timestamp);
  return {
    year: date.getFullYear(),
    month: date.getMonth()+1,
    date: date.getDate()
  }
}

export default {
  formatTime: formatTime
}