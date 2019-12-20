function checkPhone(phone) {
	// let reg=/[0-9]{11}/
	let reg=/^[1][2,3,4,5,6,7,8][0-9]{9}$/;
	if(!reg.test(phone)){
		return false
	}else{
		return true
	}
};

function findDate(aa) {
	var date1 = new Date()
	var time1 = date1.getFullYear() + "-" + (date1.getMonth()+1) + "-" + date1.getDate()
	var date2 = new Date(date1)
	date2.setDate(date1.getDate()+aa)
	var _year = date2.getFullYear()
	var _month = date2.getMonth()+1
	var _day = date2.getDate()
	if(_month < 10){
		_month = "0" + _month
	}else{
		 _month = date2.getMonth()+1
	}
	if(_day < 10){
		_day = "0" + _day
	}else{
		 _day = date2.getDate()
	}
	var time = _year + '-' + _month + "-"+ _day
	return time;
};

export default {
  checkPhone,
  findDate,
}
