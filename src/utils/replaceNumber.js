import moment from "jalali-moment";

// function MiladiToShamsi(dateString) {
//     // تاریخ را به فرمت میلادی تجزیه و سپس به شمسی تبدیل می‌کند
//     const formattedDate = moment(dateString, "YYYY-MM-DD HH:mm")
//         .locale("fa")
//         .format("YYYY/MM/DD");
//     return formattedDate;
// }

function MiladiToShamsi(dateString) {
    // تاریخ را به فرمت میلادی تجزیه و سپس به شمسی تبدیل می‌کند
    const dateMoment = moment(dateString, "YYYY-MM-DD HH:mm");

    // بررسی معتبر بودن تاریخ
    if (!dateMoment.isValid()) {
        console.error("Invalid date:", dateString);
        return "تاریخ نامعتبر";
    }

    const formattedDate = dateMoment.locale("fa").format("YYYY/MM/DD");
    return formattedDate;
}

const e2p = (s) => s.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]); //تبدیل اعداد انگلیسی به فارسی

const p2e = (s) =>
    s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString()); //تبدیل اعداد فارسی به انگلیسی

const convertToPersianNumbers = (text) => {
    return text.replace(/[0-9]/g, function (match) {
        const persianNumbers = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
        return persianNumbers[parseInt(match)];
    });
};

const splitIntoThreeDigits = (input) => {
    // حذف هر کاراکتری که عدد نیست
    const cleanedString = input?.replace(/\D/g, "");

    // تعیین اندازه گروه‌ها
    const groupSize = 3;

    // تقسیم رشته به گروه‌های سه رقمی از سمت راست
    const groups = [];
    for (let i = cleanedString?.length; i > 0; i -= groupSize) {
        const group = cleanedString?.slice(Math.max(0, i - groupSize), i);
        groups.unshift(group);
    }

    // اتصال گروه‌ها با یک جداکننده، مثل ویرگول
    const result = groups.join("،");

    return result;
};

function truncateText(text, maxWords) {
    if (text.length <= maxWords) {
        return text;
    }

    const truncatedText = text.slice(0, maxWords);
    return `${truncatedText} ...`;
}

export {
    e2p,
    p2e,
    splitIntoThreeDigits,
    truncateText,
    MiladiToShamsi,
    convertToPersianNumbers,
};
