export const requiredValidator = {
    required: "This field is required!!!"
}

export const salaryValidator = {
    required: "please fill your salary",
    min: { value: 60000, message: "salary should be higher" },
    max: { value: 80000, message: "salary should be close to the brain" },
    setValueAs: (p:string) => +p
} 