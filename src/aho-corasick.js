/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/**
 * AC 自动机字符串查找法的简单思想：
 */
class AhoCorasick {

    static find(testStr, keywordStr) {

    }
    static stringToChars(str) {
        let chars = [];
        for (let c of str) {
            chars.push(c);
        }
        return chars;
    }
}

export { AhoCorasick };