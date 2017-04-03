'use strict';

const assert = require('assert');

/**
 * create augment function with options
 *
 * @param {MDConverter~AugmentOptions} options - augmentation options
 * @returns {Function}
 */
function augmentFactory(options) {
    options || (options = {});

    /**
     * Apply custom augmentation
     *
     * @param {Object} bemNode - representation of bem entity
     * @returns {Object} bemNode
     */
    function augment(bemNode) {

        if (bemNode.block === 'md-root') {
            bemNode.isRoot = true;
        }

        if (options.prefix) {
            bemNode = augmentPrefix(bemNode, options.prefix);
        }

        if (options.scope) {
            bemNode = augmentScope(bemNode, options.scope);
        }

        if (bemNode.isRoot) delete bemNode.isRoot;

        return bemNode;
    }

    return augment;
}

/**
 * Add prefix to all block names
 * *Important*: in root block prefix `md-` will be replaced.
 *
 * @param {Object} bemNode - representation of bem entity
 * @param {string} prefix - new prefix
 * @returns {Object} bemNode
 */
function augmentPrefix(bemNode, prefix) {

    assert(typeof prefix === 'string', 'options.prefix must be string');

    // `md-` is already prefix, replace it
    if (bemNode.isRoot) {
        bemNode.block = bemNode.block.replace('md-', prefix);
    } else {
        // in other cases just add prefix
        bemNode.block = `${prefix}${bemNode.block}`;
    }

    return bemNode;
}

/**
 * Replace root with scope and blocks with elems.
 *
 * @param {Object} bemNode - representation of bem entity
 * @param {string} scope - new root block name
 * @returns {Object} bemNode
 */
function augmentScope(bemNode, scope) {

    assert(typeof scope === 'string', 'options.scope must be string');

    if (bemNode.isRoot) {
        bemNode.block = scope;
    } else {
        bemNode.elem = bemNode.block;
        bemNode.elemMods = bemNode.mods;

        delete bemNode.block;
        delete bemNode.mods;
    }

    return bemNode;
}

module.exports = augmentFactory;