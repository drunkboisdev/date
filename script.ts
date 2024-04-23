const data: any[] = [
    ["January", 31],
    ["February", 28],
    ["March", 31],
    ["April", 30],
    ["May", 31],
    ["June", 30],
    ["July", 31],
    ["August", 31],
    ["September", 30],
    ["October", 31],
    ["November", 30],
    ["December", 31]
];


const d: Date = new Date();
const year: number = d.getFullYear();
function generateDate() {
    let isLeapYear: boolean;
    if (year % 400 === 0) isLeapYear = true;
    else if (year % 100 === 0) isLeapYear = false;
    else isLeapYear = year % 4 === 0;

    // find day of the year, given any month
    function findDayOfYear(month: number): number {
        let res: number = d.getDate();
        while (month > 0) {
            month--;
            res += data[month][1];
            if (isLeapYear && month === 2) res++;
        }
        return res;
    }

    const dayOfYear: number = findDayOfYear(d.getMonth());

    // generate a random month to be displayed/calculate day of that month
    const randomMonth: number = Math.floor(Math.random() * 12);
    const dayOfMonth: number = dayOfYear - findDayOfYear(randomMonth) + d.getDate();

    // generate a random year (from 1 AD to now)
    const randomYear: number = Math.floor(Math.random() * year) + 1;
    let extraYearDays: number = (year - randomYear) * 365;

    // calculate leap days
    let firstLeapYear: number = Math.ceil(randomYear / 4);
    if (firstLeapYear % 25 === 0 && firstLeapYear % 100 !== 0) {
        firstLeapYear++;
    }
    let lastLeapYear: number = Math.floor(year / 4);
    if (lastLeapYear % 25 === 0 && lastLeapYear % 100 !== 0) {
        lastLeapYear--;
    }
    let skippedLeapYears: number = Math.floor(year / 100) - Math.ceil(randomYear / 100) - (Math.floor(year / 400) - Math.ceil(randomYear / 400));

    extraYearDays += lastLeapYear - firstLeapYear - skippedLeapYears;

    const dateDisplay = document.getElementById("date");
    if (dateDisplay === null) {
        console.error("Couldn't find HTML element with id 'date'");
    } else {
        dateDisplay.textContent = `Today is ${data[randomMonth][0]} ${dayOfMonth + extraYearDays}, ${randomYear}`;
    }
}
addEventListener("load", generateDate);