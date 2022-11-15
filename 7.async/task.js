class AlarmClock {
    constructor() {
        this.alarmCollection = [];
        this.timerId = null; // Если не присвоить никакое значение, то не проходится кейс, хотя это не нужно
    }
    addClock(time, callback, id) {
        if (id == undefined) {
            throw new Error('ID не передан')
        }
        let idError; 
        this.alarmCollection.forEach((item) => {
            if (item.id === id) {
                console.error('Будильник с таким ID уже существует');
                idError= true;
            }
        })
        if (idError) {}
        else {
            this.alarmCollection.push({
                id: id,
                time: time,
                callback: callback
            })
        }
        //Хочу реализовать проверку правильности введённой даты
    }
    removeClock(id) {
        let currentLength = this.alarmCollection.length;
        this.alarmCollection = this.alarmCollection.filter((item) => {
            return item.id !== id;
        });
        //Мне не нравится, как я это реализовал, хочу исправить
        if (currentLength === this.alarmCollection.length) {
            return false;
        } else {
            return true;
        }
    }
    getCurrentFormattedTime() {
        let currentDate = new Date();
        let hours = currentDate.getHours() < 10 ? '0' + currentDate.getHours() : `${currentDate.getHours()}`;
        let minutes = currentDate.getMinutes() < 10 ? '0' + currentDate.getMinutes() : `${currentDate.getMinutes()}`;
        return hours + ':' + minutes;
    }
    start() {
        function checkClock(alarm) {
            if (alarm.time === this.getCurrentFormattedTime()) {
                alarm.callback(); 
            }
        }
        let BindedCheckClock = checkClock.bind(this);
        if (this.timerId == undefined) {
            this.timerId = setInterval(() => {
                this.alarmCollection.forEach((item) => {
                    BindedCheckClock(item); // Колбек будет выполняться не один раз, а через минимальное время, наверное стоит задать интервал опроса?
                })
            })
        }
    }
    stop() {
        if (this.timerId != undefined) {
            clearInterval(this.timerId);
            this.timerId = null;
        }
    }
    printAlarms() {
        console.log(`Всего ${this.alarmCollection.length} будильника:`); // Вот здесь хотелось бы реализовать разные окончания в слове "будильник", наверное через регулярные выражения
        this.alarmCollection.forEach((item) => {
            console.log(`Будильник №${item.id} заведён на ${item.time}`);
        })
    }
    clearAlarms() {
        this.stop();
        this.alarmCollection = [];
    }
}

function testCase() {
    let dailyAlarm = new AlarmClock();
    dailyAlarm.addClock("22:02", () => console.log("Будильник №1"), 1);
    dailyAlarm.addClock("22:03", () => {
        console.log("Будильник №2");
        dailyAlarm.removeClock(2);
    }, 2);
    dailyAlarm.addClock("22:04", () => {
        console.log("Будильник №3");
        dailyAlarm.stop();
        dailyAlarm.clearAlarms();
        dailyAlarm.printAlarms();
    }, 3);
    dailyAlarm.printAlarms();
    dailyAlarm.start();
}