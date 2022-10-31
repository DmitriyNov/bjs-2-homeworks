function Student(name, gender, age) {
  this.name = name;
  this.gender = gender;
  this.age = age;
}

Student.prototype.setSubject = function(subjectName) {
  this.subject = subjectName;
}

Student.prototype.addMark = function(mark) {
  if (this.marks === undefined) {
    //не уверен, что правильно сразу массив создавать, в задании конкретно не написано
    this.marks = [mark];
  } else {
    this.marks.push(mark);
  }
}

Student.prototype.addMarks = function(...args) {
  if (this.marks === undefined) {
    this.marks = args;
  } else {
    args.forEach((mark) => {
      this.marks.push(mark);
    })
  }
  //пробовал склеивать массивы, не получается, подскажите, в чём ошибка
  //this.marks.concat(args);
}

Student.prototype.getAverage = function() {
  return this.marks.reduce((acc, mark, index) => {
    acc += mark;
    if (index === this.marks.length - 1) {
      return acc / this.marks.length;
    }
    return acc
  }, 0);
}

Student.prototype.exclude = function(reason) {
  this.excluded = reason;
  delete this.subject;
  delete this.marks;
}


