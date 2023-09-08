import { storyToJsonl } from './parser';

describe('storyToJsonl', () => {
  test('should handle simple story correctly', () => {
    const input = `
User: Hello
Assistant: Hi
---
User: Goodbye
Assistant: Bye
        `;
    const expected: string = [
      JSON.stringify({
        messages: [
          { role: 'user', content: 'Hello' },
          { role: 'assistant', content: 'Hi' },
        ],
      }),
      JSON.stringify({
        messages: [
          { role: 'user', content: 'Goodbye' },
          { role: 'assistant', content: 'Bye' },
        ],
      }),
    ].join("\n");;
    expect(storyToJsonl(input)).toEqual(expected);
  });

  test('should handle multiple lines in a message', () => {
    const input = `User: Hello\nHow are you?`;
    const expected: string = [
      JSON.stringify({
        messages: [
          { role: 'user', content: 'Hello\nHow are you?' }
        ],
      })
    ].join("\n");;
    expect(storyToJsonl(input)).toEqual(expected);
  });

  test('should handle edge case of empty input', () => {
    const input = ``;
    const expected: string = "";
    expect(storyToJsonl(input)).toEqual(expected);
  });

  test('should ignore leading and trailing whitespace', () => {
    const input = `  User: Hello  \nAssistant: Hi  `;
    const expected: string = [
      JSON.stringify({
        messages: [
          { role: 'user', content: 'Hello' },
          { role: 'assistant', content: 'Hi' },
        ],
      })
    ].join("\n");;
    expect(storyToJsonl(input)).toEqual(expected);
  });

  test('should handle System role', () => {
    const input = `
System: Starting
User: Hello
Assistant: Hi
        `;
    const expected: string = [
      JSON.stringify({
        messages: [
          { role: 'system', content: 'Starting' },
          { role: 'user', content: 'Hello' },
          { role: 'assistant', content: 'Hi' },
        ],
      })
    ].join("\n");
    expect(storyToJsonl(input)).toEqual(expected);
  });
});
