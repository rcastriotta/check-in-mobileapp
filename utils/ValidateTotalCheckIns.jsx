const ValidateTotalCheckIns = (lastCheckIn) => {
    if (!lastCheckIn) {
        return true
    }
    let d = new Date()
    const today = new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().replace(/T.*/, '').split('-').reverse().join('-')
    const lastCheckInFormatted = new Date(lastCheckIn.toDate().getTime() - lastCheckIn.toDate().getTimezoneOffset() * 60000).toISOString().replace(/T.*/, '').split('-').reverse().join('-')

    // make sure the count is from today
    if (lastCheckInFormatted === today) {
        return true
    }

    return false;

}

export default ValidateTotalCheckIns;