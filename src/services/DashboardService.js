import axios from "axios"


const host = 'https://backend.pipelinepredators.com'
// const host = 'http://localhost:8080';
/**
 * It returns a promise that resolves to the response of an HTTP request to the URL
 * `/quiz/api/fetch_subjects`
 * @returns An object with a data property that contains the array of subjects.
 */
export const getSubjects = async () => {
    const subjects = axios.get(`${host}/quiz/api/fetch_subjects`);
    return (await subjects).data;
}

/**
 * It fetches a quiz from the server and returns the data.
 * @returns An array of objects.
 */
export const getTakeQuizzes = async ({ subjectId, questionNumber }) => {

    const quizzes = axios.get(`${host}/quiz/api/fetch_quiz`,
        {
            params: {
                subjectId: subjectId,
                questionNumber: questionNumber
            }
        });
    return (await quizzes).data;
}

/**
 * It takes in a subjectIdNo and a questionArray, and then it sends a POST request to the server with
 * the subjectIdNo and questionArray as the payload.
 * @returns {
 *     "status": "success",
 *     "message": "Quiz created successfully",
 *     "data": {
 *         "quizId": "5d8f8f8f8f8f8f8f8f8f8f8f"
 *     }
 * }
 */
export const uploadQuizzes = async ({ subjectIdNo, questionArray }) => {
    let payload = {
        subjectId: subjectIdNo,
        questions: questionArray
    }
    const response= axios.post(`${host}/quiz/api/create_quiz`, payload);
    return (await response).data;
}

export const deleteAllQuizzes = async({subjectIdNo})=>{
    const response = axios.delete(`${host}/quiz/api/delete_all_quiz/${subjectIdNo}`)
    return (await response).data
}