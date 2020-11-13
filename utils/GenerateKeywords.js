const createKeyword = (text) => {
    if (!text) {
        return
    }
    const keywords = [];
    let curText = ''
    text.split('').forEach(letter => {
        curText += letter;
        keywords.push(curText);
    })
    return keywords;
}

const removeDuplicates = (arr) => {
    var seen = {};
    var ret_arr = [];
    for (var i = 0; i < arr.length; i++) {
        if (!(arr[i] in seen)) {
            ret_arr.push(arr[i]);
            seen[arr[i]] = true;
        }
    }
    return ret_arr;
}

// ALLOWS FOR SEARCH BY FIRST NAME, LAST NAME, EMAIL, AND PHONE
const GenerateKeywords = (name, email, phone) => {
    let keywordArr;
    const nameKeywords = [...createKeyword(name.split(' ')[0]), ...createKeyword(name.split(' ')[1]), ...createKeyword(name.replace(/ /g, ''))]
    const emailKeywords = [...createKeyword(email)]
    const phoneKeywords = [...createKeyword(phone)]

    // combine individual arrays
    keywordArr = [...nameKeywords, ...emailKeywords, ...phoneKeywords]

    // remove any duplicates to optimize space
    keywordArr = removeDuplicates(keywordArr)

    return keywordArr;
}


export default GenerateKeywords;