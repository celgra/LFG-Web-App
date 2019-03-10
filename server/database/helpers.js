
const findAll = async (db, table, { fields, count, page }) => {
    try {
        if (count) {
            let offset = page > 1 ? page * count : count;

            let tablePage =  await db(table).limit(count).offset(offset)
                .orderBy(fields[0]).select(fields);
            let rows = await db('games').count();
            let totalCount = parseInt(rows[0].count);
            let obj = { page, totalCount };
            obj[table] = tablePage;
            return obj;
        } else {
            return db(table).select(fields);
        }
    } catch (error) {
        return Promise.reject(error);
    }
}

const find = async (db, table, { id, fields }) => {
    try {
        let rows = await db(table).where({ id }).select(fields);
        return rows[0];
    } catch (error) {
        return Promise.reject(error);
    }
};

module.exports = {
    findAll,
    find
};