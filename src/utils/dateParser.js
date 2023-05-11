function getFormattedDate() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Months are zero-based
    const year = currentDate.getFullYear();

    // Pad the day and month with leading zeros if necessary
    const formattedDay = String(day).padStart(2, '0');
    const formattedMonth = String(month).padStart(2, '0');

    // Return the formatted date string
    return `${formattedDay}.${formattedMonth}.${year}`;
}

module.exports = getFormattedDate