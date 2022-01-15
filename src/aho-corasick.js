/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import { TrieTree } from './trie-tree.js';

/**
 * AC 自动机字符串查找
 */
class AhoCorasick {

    static find(testStr, keywordsStr) {
        let testChars = AhoCorasick.stringToChars(testStr);
        let keywordsChars = keywordsStr.map(keywordStr => {
            return AhoCorasick.stringToChars(keywordStr);
        });

        let result = []; // 用于存放搜索的结果 [{index: 0, word: 'string'}, {index, word}, ...]

        // 构建前缀树
        let rootNode = TrieTree.build(keywordsChars);

        // 从 root 节点开始跟 "被查找字符串" 逐个字符进行匹配
        let nextNode = rootNode;

        for (let idx = 0; idx < testChars.length; idx++) {
            let char = testChars[idx];

            // 从当前节点查找匹配的子节点
            let childNode = nextNode.getChildNode(char);

            if (childNode === undefined) { // 没找到子节点
                // 从当前节点没有找到直接的子节点，但可以再
                // 从当前节点的 fail node 再找一次子节点，
                // 因为 fail node 的前缀跟当前节点的前缀一样，
                // 所以不需要从 root 节点开始从头开始查找，跳过相同的前缀，
                // 被查找字符串的指针（也就是 idx）也不需要退回，这是 ac 自动机
                // 的主要原理。

                if (nextNode.failNode === null) { // 当前是 root 节点
                    // 我们构建的 root 节点没有 fail node，所以维持当前节点不变
                    continue;
                }

                // 从 fail node 查找匹配的子节点
                let failNode = nextNode.failNode;
                childNode = failNode.getChildNode(char);

                if (childNode === undefined) { // fail node 也没找到子节点
                    nextNode = failNode; // 下次从 fail node 开始寻找
                    continue;
                }
            }

            // 判断找到的子节点是否一个完整的单词
            if (childNode.lens.length > 0) {
                for (let len of childNode.lens) {
                    let pos = idx - len + 1;
                    let wordChars = testChars.slice(pos, idx + 1);
                    result.push({
                        index: pos,
                        word: wordChars.join('')
                    });
                }
            }

            // 下次从子节点开始寻找
            nextNode = childNode;
        }

        return result;
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