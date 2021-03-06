'use strict';

const expect = require('chai').expect;

const toBemjson = require('../index');

describe('Plugins', () => {
    it('should extract @mention from github', () => {
        const bjson = toBemjson.convertSync('@birhoff');
        const link = bjson.content.content;

        expect(link).to.have.property('block', 'link');
        expect(link).to.have.property('content');
        expect(link).to.have.property('href', 'https://github.com/birhoff');
    });

    it('should convert definitions to inline', () => {
        const bjson = toBemjson.convertSync([
            '[foo], [foo][], [bar][foo].',
            '',
            '![foo], ![foo][], ![bar][foo].',
            '',
            '[foo]: http://example.com "Example Domain"',
            ''
        ].join('\n'));

        expect(bjson).to.deep.equal(require('./test-assets/definitions2inline'));
    });
});
