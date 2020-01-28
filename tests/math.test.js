test('hello', () => {

})
const total = (x,y) => {
    return x+y
}

test('fhello', () => {
    const s = total(2,5)
    expect(s).toBe(7)   
    })
    
    // test('fhello', () => {
    //     const s = total(2,5)
    //     if (s != 7){throw new Error('failure') }
           
    //     })