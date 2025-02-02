"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionWrapper = transactionWrapper;
exports.getSoftDeletedCascadedEntitiesIdsMappedBy = getSoftDeletedCascadedEntitiesIdsMappedBy;
exports.normalizeMigrationSQL = normalizeMigrationSQL;
const common_1 = require("../common");
async function transactionWrapper(manager, task, { transaction, isolationLevel, enableNestedTransactions = false, } = {}) {
    // Reuse the same transaction if it is already provided and nested transactions are disabled
    if (!enableNestedTransactions && transaction) {
        return await task(transaction);
    }
    const options = {};
    if (transaction) {
        Object.assign(options, { ctx: transaction });
    }
    if (isolationLevel) {
        Object.assign(options, { isolationLevel });
    }
    const transactionMethod = manager.transaction ?? manager.transactional;
    return await transactionMethod.bind(manager)(task, options);
}
/**
 * Can be used to create a new Object that collect the entities
 * based on the columnLookup. This is useful when you want to soft delete entities and return
 * an object where the keys are the entities name and the values are the entities
 * that were soft deleted.
 *
 * @param entities
 * @param deletedEntitiesMap
 * @param getEntityName
 */
function getSoftDeletedCascadedEntitiesIdsMappedBy({ entities, deletedEntitiesMap, getEntityName, restored, }) {
    deletedEntitiesMap ??= new Map();
    getEntityName ??= (entity) => entity.constructor.name;
    for (const entity of entities) {
        const entityName = getEntityName(entity);
        const shouldSkip = !!deletedEntitiesMap
            .get(entityName)
            ?.some((e) => e.id === entity.id);
        if ((restored ? !!entity.deleted_at : !entity.deleted_at) || shouldSkip) {
            continue;
        }
        const values = deletedEntitiesMap.get(entityName) ?? [];
        values.push(entity);
        deletedEntitiesMap.set(entityName, values);
        Object.values(entity).forEach((propValue) => {
            if (propValue != null && (0, common_1.isObject)(propValue[0])) {
                getSoftDeletedCascadedEntitiesIdsMappedBy({
                    entities: propValue,
                    deletedEntitiesMap,
                    getEntityName,
                });
            }
        });
    }
    return Object.fromEntries(deletedEntitiesMap);
}
function normalizeMigrationSQL(sql) {
    sql = sql.replace(/create table (?!if not exists)/g, "create table if not exists ");
    sql = sql.replace(/alter table (?!if exists)/g, "alter table if exists ");
    sql = sql.replace(/create index (?!if not exists)/g, "create index if not exists ");
    sql = sql.replace(/alter index (?!if exists)/g, "alter index if exists ");
    sql = sql.replace(/drop index (?!if exists)/g, "drop index if exists ");
    sql = sql.replace(/create unique index (?!if not exists)/g, "create unique index if not exists ");
    sql = sql.replace(/drop unique index (?!if exists)/g, "drop unique index if exists ");
    sql = sql.replace(/add column (?!if not exists)/g, "add column if not exists ");
    sql = sql.replace(/drop column (?!if exists)/g, "drop column if exists ");
    sql = sql.replace(/drop constraint (?!if exists)/g, "drop constraint if exists ");
    return sql;
}
//# sourceMappingURL=utils.js.map