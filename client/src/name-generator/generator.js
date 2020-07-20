'use strict';

const data = {
    nouns : require('./nouns.json'),
    adjectives : require('./adjectives.json')
}

function generate(){
    const ran_a = Math.floor(Math.random() * data.nouns.length)
    const ran_b = Math.floor(Math.random() * data.adjectives.length)
    var username = `${data.adjectives[ran_b]} ${data.nouns[ran_a]}`;
    username = username.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    return username;
}

module.exports = {generator: generate}