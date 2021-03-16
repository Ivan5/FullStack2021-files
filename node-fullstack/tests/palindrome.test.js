const { palindrome } = require('../utils/for_testing')

test('palindrome of ivan', () => {
    const result = palindrome('ivan')

    expect(result).toBe('navi')
})

test('palindrome of empty string', () => {
    const result = palindrome('')

    expect(result).toBe('')
})