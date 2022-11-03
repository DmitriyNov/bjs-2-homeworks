//Задание №1

class PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        this.name = name;
        this.releaseDate = releaseDate;
        this.pagesCount = pagesCount;
        this.state = 100;
        this.type = null;
    }
    fix() {
        this.state *= 1.5;
    }
    //Вообще не понял как работают функции геттеры и сеттеры, почему, когда мы вызываем метод fix(), 
    //у нас автоматически вызывается функция сеттер и как туда передаётся текущее значение state?
    set state(number) {
        if (number < 0) {
            this._state = 0;
        } else if(number > 100) {
            this._state = 100;
        } else {
            this._state = number;
        }
    }
    get state() {
        return this._state;
    }
}

class Magazine extends PrintEditionItem {
    constructor(name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.type = "magazine";
    }
}

class Book extends PrintEditionItem {
    constructor(author, name, releaseDate, pagesCount) {
        super(name, releaseDate, pagesCount);
        this.type = "book";
        this.author = author;
    }
}

class NovelBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = "novel";
    }
}

class FantasticBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = "fantastic";
    }
}

class DetectiveBook extends Book {
    constructor(author, name, releaseDate, pagesCount) {
        super(author, name, releaseDate, pagesCount);
        this.type = "detective";
    }
}

//Задание №2

class Library {
    constructor(name) {
        this.name = name;
        this.books = [];
    }
    addBook(book) {
        if (book.state > 30) {
            this.books.push(book);
        }
    }
    findBookBy(type, value) {
        let result;
        this.books.forEach((item, index) => {
            if (item[type] === value) {
                result = index;
                return result;
            }
        })
        if (result === undefined) {
            return null;
        } else {
            return this.books[result];
        }
    }
    giveBookByName(bookName) {
        let result;
        this.books.forEach((item, index) => {
            if (item.name === bookName) {
                result = index;
                return result;
            }
        })
        if (result === undefined) {
            return null;
        } else {
            let found = this.books[result];
            this.books.splice(result, 1);
            return found;
        }
    }
}

//Задание №3

class Student {
    constructor(name, gender, age) {
        this.name = name;
        this.gender = gender;
        this.age = age;
        //Пришлось дополнительно создать свойство, где хранятся названия предметов, по которым были выставлены оценки, 
        //без этого не могу посчитать среднее арифметическое по всем оценкам и удалить все лишние свойства в методе excluded
        this.subjects = [];
    }
    addMark(mark, subjectName) {
        if (6 > mark > 0) {
            if (this[subjectName+"Marks"] === undefined) {
                this.subjects.push(subjectName);
                this[subjectName+"Marks"] = [mark];
            } else {
                this[subjectName+"Marks"].push(mark);
            }
        } else {
            console.log("Ошибка, оценка должна быть числом от 1 до 5");
        }
    }
    getAverageBySubject(subjectName) {
        if (this[subjectName+"Marks"] === undefined) {
            console.log("Несуществующий предмет");
        } else {
            return this[subjectName+"Marks"].reduce((acc, mark, index) => {
                acc += mark;
                if (index === this[subjectName+"Marks"].length - 1) {
                    return acc / this[subjectName+"Marks"].length;
                }
                return acc
            }, 0);
        }
    }
    getAverage() {
        let sum = 0;
        this.subjects.map((item) => {
            sum += this.getAverageBySubject(item);
        })
        return sum / this.subjects.length;
    }
    exclude(reason) {
        this.excluded = reason;
        this.subjects.map((item) => {
            delete this[item+"Marks"];
        })
        delete this.subjects;
    }
}

const student = new Student("Олег Никифоров");
student.addMark(5, "algebra");
student.addMark(5, "algebra");
student.addMark(5, "geometry");
student.addMark(4, "geometry");
student.addMark(6, "geometry");
student.getAverageBySubject("geometry");
student.getAverageBySubject("biology");
student.getAverage();
student.exclude("Исключен за попытку подделать оценки");
