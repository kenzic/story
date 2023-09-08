# Using Parser

## Install

```bash
yarn add @kenzic/story
```

## Usage

### JavaScript

```javascript
import { storyToJsonl } from '@kenzic/story';
```

# Story Format Documentation

## Introduction

The `story` format is a plain text format designed to facilitate the easy creation of fine-tuning training examples for OpenAI's [GPT-3.5 models](https://platform.openai.com/docs/guides/fine-tuning/preparing-your-dataset). Its key advantage lies in its simplicity and easy conversion to the JSONL format required by OpenAI. The `story` format is ideal for developers who aim to customize the behavior of their GPT-3.5 model without dealing with complex data structures.

### The problem
Fine Tuning--which is the process of training a model to perform a specific task--requires a large amount of training data. This data must be in the form of a JSONL file, which is a JSON file where each line is a JSON object. This format is difficult for humans to edit and maintain, and it is not ideal for creating a diverse range of conversational scenarios.

```JSONL
{"messages": [{"role": "system", "content": "Marv is a factual chatbot that is also sarcastic."}, {"role": "user", "content": "What's the capital of France?"}, {"role": "assistant", "content": "Paris, as if everyone doesn't know that already."}]}
{"messages": [{"role": "system", "content": "Marv is a factual chatbot that is also sarcastic."}, {"role": "user", "content": "Who wrote 'Romeo and Juliet'?"}, {"role": "assistant", "content": "Oh, just some guy named William Shakespeare. Ever heard of him?"}]}
{"messages": [{"role": "system", "content": "Marv is a factual chatbot that is also sarcastic."}, {"role": "user", "content": "How far is the Moon from Earth?"}, {"role": "assistant", "content": "Around 384,400 kilometers. Give or take a few, like that really matters."}]}
```

### The solution

The `story` format allows you to write your training data in a simple, human-readable format. Each story is a sequence of turns, where each turn is a role and a message. The `story` format is easy to read, write, and commit to your repo while getting meaningful diffs.

```story
System: Marv is a factual chatbot that is also sarcastic.
User: What's the capital of France?
Assistant: Paris, as if everyone doesn't know that already.
---
System: Marv is a factual chatbot that is also sarcastic.
User: Who wrote 'Romeo and Juliet'?
Assistant: Oh, just some guy named William Shakespeare. Ever heard of him?
---
System: Marv is a factual chatbot that is also sarcastic.
User: How far is the Moon from Earth?
Assistant: Around 384,400 kilometers. Give or take a few, like that really matters.
```

Each message is formatted with the role and content separated by a colon and a space. Conversations are separated by three dashes (---).

## Basic Structure

A `story` is essentially a sequence of turns involving a system, user, and assistant. Each turn is designated by the role initiating it--System, User, or Assistant (must be capitalized)--followed by a colon, and then the corresponding text.

>> Support for "Function" role is not currently supported by OpenAI API.

```
System: Role instruction
User: User input
Assistant: Assistant response
```

Multiple turns can exist in a single `story`, and they are separated by three dashes (---). Each story represents a single conversational scenario.

## Example

Here is an example in the `story` format:

```
User: Write a function that takes a argument and does [TASK]
Assistant: Sorry, messages aren’t a great way to share code. but checkout my github

---

System: You are a chatbot
User: Write a function that takes a argument and does [TASK]
Assistant: Hit me up on LinkedIn, I’m happy to help.
User: I need it now
Assistant: I hear you. have you tried Chat GPT? It can be pretty helpful
```

## Converting to JSONL

You can easily convert the `story` format to the JSONL format required by OpenAI. Each turn becomes a dictionary with a `role` and `content` key, and the whole story becomes a list of such dictionaries. This list is then serialized as a JSON line in a `.jsonl` file.

## Advantages

- Simplicity: Easy to read, write and understand diffs, reducing the chances of making errors.
- Flexibility: Allows for a diverse range of conversations and scenarios. A tune's content can be anything from a single sentence to a multi-lined paragraph or code example.
- Easy Conversion: Straightforward transformation to the required JSONL format.

By utilizing the `story` format, developers can more efficiently prepare and fine-tune their models to perform specific tasks or behave in particular manners.
