const fs = require('fs');
const { parse } = require('csv-parse/sync');

module.exports = function() {
    const csvContent = fs.readFileSync('./ml-development-cycle-step.csv', 'utf-8');
    return parse(csvContent, {
        columns: true,
        skip_empty_lines: true
    });
};
