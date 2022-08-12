exports.getAge = (dob) => Math.round((new Date() - new Date(dob)) / (356 * 3600 * 24000))
    
exports.getEndDate = (duration) => {let a = new Date(); let b = (duration * 3600000 * 24); return new Date(a.getTime() + b);} 

exports.getDuration = (date) => Math.round((new Date(date) - new Date()) / (3600 * 24000))

exports.getDateString = (date) => { let d = new Date(date); return d.toLocaleString()}