module.exports = {
    format_date: date => {
        // Format date as MM/DD/YYYY
        const d = new Date(date);
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const year = d.getFullYear();
        return `${month}/${day}/${year}`;
    }
};

