import * as yup from "yup"

export const createTractorSchema = yup.object().shape({
    name: yup.string().required(),
    image: yup.mixed()
})

export const updateTractorSchema = yup.object().shape({
    name: yup.string(),
    image: yup.mixed()
})

