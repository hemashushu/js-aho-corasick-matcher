/**
 * Copyright (c) 2022 Hemashushu <hippospark@gmail.com>, All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/**
 * 前缀树
 *
 * 将一个单词（word）的每一个字符按顺序连接，形成一条分支，比如：
 *
 * ROOT
 *   |--b
 *   |  |--o
 *   |  |  |--y          <-- "boy"
 *   |  |  |
 *   |  |  |--o
 *   |  |  |  |--l       <-- "bool"
 *   |
 *   |--c
 *   |  |--a
 *   |  |  |--t          <-- "cat"
 *
 */
class TrieTreeNode {
    constructor(index, parent, char) {
        // 节点的序号，用于方便观察和调试
        this.index = index;

        // 指向父节点的引用
        this.parent = parent;

        // 当前节点的字符
        this.char = char;

        // 子节点 {char1->TrieTreeNode1, char2->TrieTreeNode2, ...}
        //
        // 使用 JS 内置对象 Map 实现，有关 Map 对象的资料：
        // https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map
        this.children = new Map();

        // 当前节点匹配失败时，应该转向的节点。
        // 指向的节点：
        // - 字符跟当前节点的一样
        // - 有相同的前缀
        this.failNode = null;

        // 如果当前节点为完整的单词，则记录该单词的长度。
        // 如果转向节点的字符刚好能凑够一个单词，则该单词的长度也记录。
        this.lens = [];
    }

    /**
     * 根据指定的 char 获取子节点，如果不存在指定的 char， 则返回 undefined.
     * @param {*} char
     * @returns
     */
    getChildNode(char) {
        return this.children.get(char);
    }

    addChildNode(char, node) {
        if (this.children.has(char)) {
            throw new Error('The specified character already exists.');
        }

        this.children.set(char, node);
    }

    toString() {
        let text = '#' + this.index + ':' + this.char;

        if (this.lens.length > 0) {
            // 当前节点是单词的最后一个字符的节点
            let s = this.lens.join(',');
            text += '=(' + s + ')';
        }

        if (this.failNode !== null) { // root 节点的 fail node 等于 null
            if (this.failNode.char === null){
                // 指向 root 节点的 fail node 没必要显示
            }else {
                text += '~>' + this.failNode.index;
            }
        }

        if (this.children.size > 0) {
            let lines = Array.from(this.children.values())
                .map(item => {
                    return item.toString();
                });
            text += '->[' + lines.join(',') + ']';
        }

        return text;
    }
}

class TrieTree {
    static build(keywordsChars) {
        let index = 0;
        let root = new TrieTreeNode(index, null, null);

        /**
         * 构建节点树
         */

        for (let keywordChars of keywordsChars) {
            let currentNode = root;

            // 一边搜索已存在的节点，一边构建当前单词的分支
            for (let idx = 0; idx < keywordChars.length; idx++) {
                let char = keywordChars[idx];
                let childNode = currentNode.getChildNode(char);
                if (childNode === undefined) {
                    index++;
                    childNode = new TrieTreeNode(index, currentNode, char);
                    currentNode.addChildNode(char, childNode);
                }

                // 当前单词已经完毕，在当前节点的 lens 属性里添加上单词的长度。
                if (idx === keywordChars.length - 1) {
                    childNode.lens.push(keywordChars.length);
                }

                // 准备移到下一个节点
                currentNode = childNode;
            }
        }

        /**
         * 填充节点的 fail node
         */

        // 使用队列来遍历节点树
        let queen = []; // push（加入），shift（移除）
        queen.push(root);

        while(queen.length > 0) {
            let currentNode = queen.shift();
            for(let childNode of currentNode.children.values()) {
                queen.push(childNode);
            }

            if (currentNode.char === null) { // 根节点
                // 没有 fail node

            }else if (currentNode.parent.char === null) { // 第一层节点
                // 因为单个字符的单词没有后缀，所以它的 fail node 指向 root
                currentNode.failNode = root;

            }else {
                let parentFailNode = currentNode.parent.failNode; // 父节点的 fail node
                let failNode = parentFailNode.getChildNode(currentNode.char); // 尝试获取父节点的 fail node 的子节点，看看有无跟当前节点 char 一样的。
                if (failNode === undefined) {
                    currentNode.failNode = root; // 没找到，让它的 fail node 指向 root
                }else {
                    currentNode.failNode = failNode; // 找到了

                    if (currentNode.lens.length > 0 && failNode.lens.length > 0) {
                        // 当前节点以及它的 fail node 节点都是完整的单词的最后一个字符，所以把 fail node 本身的 len 也加进来。
                        currentNode.lens.push(failNode.lens[0]);
                    }
                }
            }
        }

        return root;
    }
}

export { TrieTree, TrieTreeNode };