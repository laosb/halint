# AST-based lint solution

## Intro

Instead of directly check with RegEx-es, we construct an AST and then check the AST according to the given rules.

## Definition of the AST

The AST is an array of objects written in JSON or JSON-compatible languages.

Every node has those keys: `type`, `lang`, `position` and one between `items` and `value`.

`position` is defined as an object containing those keys, all of whose key values are *Number*: `start`, `end` and `length`.

`length` is always equal to `end` - `start` + 1, and `start`/`end` start from 0.

`items` is an array containing all leaf nodes while `value` is just a *String*.

`paragraph`s can have `sentence`s, `sentence`s can have `piece`s and `pieces`s can have `word`s or `mark`s. Separating `mark`s are always included at the end of the previous piece, instead of the beginning of the next one.

## Example

Here is a text in Chinese:

> Meteor，一个用于开发现代网页和移动应用的全栈 Java Script 平台。End.

_(Just for demonstrating, not a correct sentence in meaning and spell.)_

When parsed into an AST, it looks like:

```json
[
    {
        "type": "paragraph",
        "lang": "zh_cn",
        "position": {
            "line": 1,
            "start": 0,
            "end": 44,
            "length": 45
        },
        "items": [
            {
                "type": "sentence",
                "lang": "zh_cn",
                "position": {
                    "line": 1,
                    "start": 0,
                    "end": 40,
                    "length":  41
                },
                "items": [
                    {
                        "type": "piece",
                        "lang": "en",
                        "position": {
                            "line": 1,
                            "start": 0,
                            "end": 6,
                            "length": 7
                        },
                        "items": [
                            {
                                "type": "word",
                                "lang": "en",
                                "value": "Meteor",
                                "position": {
                                    "line": 1,
                                    "start": 0,
                                    "end": 5,
                                    "length": 6
                                }
                            },
                            {
                                "type": "mark",
                                "value": "，",
                                "position": {
                                    "line": 1,
                                    "start": 6,
                                    "end": 6,
                                    "length": 1
                                }
                            }
                        ]
                    },
                    {
                        "type": "piece",
                        "lang": "zh_cn",
                        "items": [
                            {
                                "type": "word",
                                "lang": "zh_cn",
                                "value": "一个用于开发现代网页和移动应用的全栈",
                                "position": {
                                    "line": 1,
                                    "start": 7,
                                    "end": 24,
                                    "length": 18
                                }
                            },
                            {
                                "type": "mark",
                                "value": " ",
                                "position": {
                                    "line": 1,
                                    "start": 25,
                                    "end": 25,
                                    "length": 1
                                }
                            },
                            ...
                        ]
                    },
                ]
            }
        ]
    }
]
```
