export default function(ds, form) {
    let whereSql = '';
    let { sql } = ds;
    let filter = {};
    sql = sql
        .replace(/\n\r/g, ' ')
        .replace(/\s+/g, ' ')
        .replace(',,', ',')
        .replace(', ,', ',');

    const cols = [];
    const colPieces = [];
    if (form) {
        filter = form.models;
        for (const child of form.children) {
            if (child.type === 'select' && child.options.subdivision && child.options.subdivisionVal) {
                colPieces.push(child.options.subdivisionSql);
                cols.push(child.name);
            }
        }
    }

    for (const key in filter) {
        if ({}.hasOwnProperty.call(filter, key)) {
            const formItem = form.children.find((item) => {
                return item.name === key;
            });
            if (formItem) {
                if (Array.isArray(filter[key])) {
                    if (formItem.type === 'date-picker' && formItem.options.type.indexOf('range') > -1) {
                        if (filter[key][0] !== null && filter[key][0] !== undefined) {
                            whereSql += `AND ${key} >= "${filter[key][0]}" `;
                        }
                        if (filter[key][1] !== null && filter[key][1] !== undefined) {
                            whereSql += `AND ${key} <= "${filter[key][1]}" `;
                        }
                    }
                    if (formItem.type === 'select' && formItem.options.multiple) {
                        if (filter[key].length > 0) {
                            whereSql += `AND (${key} LIKE "%${filter[key][0]}%" `;
                            for (let i = 1; i < filter[key].length; i++) {
                                if (filter[key][i] !== null && filter[key][i] !== undefined) {
                                    whereSql += `OR ${key} LIKE "%${filter[key][i]}%" `;
                                }
                            }
                            whereSql += ') ';
                        }
                    }
                } else if (filter[key] !== null && filter[key] !== undefined) {
                    whereSql += `AND ${key} LIKE "%${filter[key]}%" `;
                }
            }
        }
    }
    if (sql.indexOf('{condiPiece}') > -1) {
        sql = sql.replace('{condiPiece}', whereSql);
    }
    if (sql.indexOf('{colPiece}') > -1) {
        if (colPieces.length > 0) {
            sql = sql.replace('{colPiece}', colPieces.join(', '));
        } else {
            sql = sql
                .replace('{colPiece},', '')
                .replace('{colPiece} ,', '')
                .replace('{colPiece}', '');
        }
    }

    if (sql.indexOf('{groupPiece}') > -1) {
        const groupPiece = cols.length > 0 ? `group by ${cols.join(', ')} with rollup` : '';
        sql = sql.replace('{groupPiece}', groupPiece);
    }
    return sql
        .replace(/\n\r/g, ' ')
        .replace(/\s+/g, ' ')
        .replace(',,', ',')
        .replace(', ,', ',');
}
