'use strict';

/**
 * task-assignment service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::task-assignment.task-assignment');
