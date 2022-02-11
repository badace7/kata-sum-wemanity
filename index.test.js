const useCustomSeparatorHandler = (number) => {
    const foundDoubleSlash = number.search("//");

    var delimiter = number.substring(
        number.indexOf("/") + 2, 
        number.lastIndexOf("\n")
    );

    var calcul = number.substring(
        number.indexOf("\n") + 1, 
    );

    if(foundDoubleSlash === 0) {
        return {number: calcul, delimiter: delimiter};
    }
    
    return {number: number, delimiter: ','};
};

const add = (number) => {
    if (number === "") return '0';

    const newLineIndex = number.search("\n,")

    if(newLineIndex != -1){
        return `Number expected but \\n found at position ${newLineIndex}`;
    }
    const {number:newNumber, delimiter} = useCustomSeparatorHandler(number);
    const numbers = newNumber.replace('\n', delimiter).split(delimiter);

    const last = numbers[numbers.length - 1];
    if (last === "") return "Number expected but EOF found.";

    return numbers.reduce((sum, value) => {
        return sum + parseInt(value);
    }, 0).toString();
};

test("empty string return 0", () => {
    expect(add("")).toBe("0");
});

test("return imput number", ()=>{
    expect(add("1")).toBe("1");
}); 

test("return the sum of numbers", ()=> {
    expect(add("1,2,3")).toBe("6");
});

test("return the sum of numbers separated with \\n and ','", ()=> {
    expect(add('1\n2,3')).toBe("6")
})
test("return error if  \\n and ',' are not separated with number", ()=> {
    expect(add('1\n,2')).toBe("Number expected but \\n found at position 1")
})

test("returns error if last element not a number", () => {
    expect(add('1,')).toBe("Number expected but EOF found.")
});

test("returns sum with custom separator", () => {
    expect(add('//;\n1;2')).toBe("3")
});

test("returns sum with custom separator", () => {
    expect(add('//|\n1|2|3')).toBe("6")
});

test("returns sum with custom separator", () => {
    expect(add('//sep\n2sep3')).toBe("5")
});

/*test("returns excption if wrong separator was used", () => {
    expect(add('//|\n1|2,3')).toBe("'|' expected but ',' found at position 3.")
});*/