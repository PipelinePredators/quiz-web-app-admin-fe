import React, { useEffect, useRef, useState } from 'react'
import PanelHeader from "components/PanelHeader/PanelHeader.js";
import { read, utils } from 'xlsx';
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    Table,
    Form,
    FormGroup,
    FormText,
    Button,
    Label,
    Input,

    CardHeader
} from "reactstrap";
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getTakeQuizzes } from 'services/DashboardService';
import { setTakeQuizState } from 'redux/TakeQuizSlice';
import { uploadQuizzes } from 'services/DashboardService';
import { deleteAllQuizzes } from 'services/DashboardService';
import { removeTakeQuizState } from 'redux/TakeQuizSlice';
import Swal from 'sweetalert2';


const Subjects = () => {

    /* Destructuring the `subjectName` from the `useParams` hook. */
    const { subjectName } = useParams();

    const [subject, setSubject] = useState('')
    const [questions, setQuestions] = useState([]);
    const [subjectIDNO, setSubjectIDNo] = useState(0);
    const [uploadButtonHidden, setUploadButtonHidden] = useState(false);

    const subjects = useSelector(state => state.subject.value);

    const dispatch = useDispatch()

    /* Setting the heading to the subject name. */
    useEffect(() => {
        setHeading()
    }, [subjectName])

    /**
 * It takes the file from the input, and then passes it to the handleFileAsync function.
 * @param event - The event that triggered the function
 */
    const onUploadExcelFile = (event) => {
        event.preventDefault();
        const inputFile = document.getElementById('excelFile');
        const inputFileRef = inputFile?.files[0];
        handleFileAsync(inputFileRef).then(value => {
            let checkForColumnMatches = false;
            let errorQuestion = null;
            for (const question of value) {
                if (question['Question'] !== undefined &&
                    question['Option A'] !== undefined &&
                    question['Option B'] !== undefined &&
                    question['Option C'] !== undefined &&
                    question['Option D'] !== undefined &&
                    question['Answer'] !== undefined) {
                    if (
                        question['Question'] !== '' &&
                        question['Option A'] !== '' &&
                        question['Option B'] !== '' &&
                        question['Option C'] !== '' &&
                        question['Option D'] !== '' &&
                        question['Answer'] !== ''
                    ) {
                        checkForColumnMatches = true;
                    }
                } else {
                    errorQuestion = question;
                    checkForColumnMatches = false;
                    break;
                }
            }

            if (checkForColumnMatches) {
                const formattedQuestions = value.map((question) => {
                    const formattedQuestion = {
                        'Question': question['Question'].trim(),
                        'Option A': question['Option A'].trim(),
                        'Option B': question['Option B'].trim(),
                        'Option C': question['Option C'].trim(),
                        'Option D': question['Option D'].trim(),
                        'Answer': question['Answer'].trim()
                    }
                    return formattedQuestion;
                })
                setQuestions(formattedQuestions);
                setUploadButtonHidden(false);
            } else {
                notifyUserOfImproperFormat(errorQuestion);
            }

        })
    }


    /**
     * It takes a file, reads it as an array buffer, converts it to a workbook, gets the first sheet,
     * and converts it to JSON.
     * @param file - The file object that you get from the input element.
     * @returns An array of objects.
     */
    const handleFileAsync = async (file) => {
        const f = await file.arrayBuffer();
        const wb = read(f);
        const ws = wb.Sheets[wb.SheetNames[0]];
        const data = utils.sheet_to_json(ws);
        return data;
    }

    const notifyQuestionUpload = (message) => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'info',
            title: message
        })
    }

    const notifyUserOfImproperFormat = (errorQuestion) => {
        Swal.fire(
            'Warning!',
            `Improper Formatting of content. Please check your excel sheet.
                ${errorQuestion['Question']},&#10;
                ${errorQuestion['Option A']},&#10;
                ${errorQuestion['Option B']},&#10;
                ${errorQuestion['Option C']},&#10;
                ${errorQuestion['Option D']},&#10;
                ${errorQuestion['Answer']}&#10;
            `,
            'error'
        ).then((result) => {
            if (result.isConfirmed) {
                location.reload();
            }
        })
    }

    const deleteNofication = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteAllQuizzes({ subjectIdNo: subjectIDNO }).then((value) => {
                    dispatch(removeTakeQuizState());
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    ).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    })
                })
            }
        })
    }

    const onUploadNotification = () => {
        Swal.fire({
            title: 'Are you sure you want to upload questions?',
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!'
        }).then((result) => {
            if (result.isConfirmed) {
                let errorMessage = {
                    uploadError: {}
                }
                uploadQuizzes({ subjectIdNo: subjectIDNO, questionArray: questions }).then((value) => {
                    console.log('Value', value?.error?.code)
                    if (value?.error?.code !== undefined) {
                        errorMessage.uploadError = value
                        throw errorMessage;
                    }
                    Swal.fire(
                        'Success!',
                        'Your file has been uploaded successfully.',
                        'success'
                    ).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    })
                }).catch((err) => {
                    console.log('Error', err)
                    if (err?.uploadError !== null) {
                        Swal.fire(
                            'Warning!',
                            `Uploaded With Errors '${err?.uploadError?.error?.sqlMessage}'`,
                            'warning'
                        ).then((result) => {
                            if (result.isConfirmed) {
                                location.reload();
                            }
                        })
                    } else {
                        Swal.fire(
                            'Error!',
                            'Upload failed.',
                            'error'
                        ).then((result) => {
                            if (result.isConfirmed) {
                                location.reload();
                            }
                        })
                    }
                })
            }
        })
    }


    /**
     * It sets the subject name based on the subject name passed in the URL
     */
    const setHeading = () => {
        switch (subjectName) {
            case 'english':
                setSubject(subjects[0].name);
                fetchQuiz(subjects[0].id);
                break;
            case 'mathematics':
                setSubject(subjects[1].name);
                fetchQuiz(subjects[1].id);
                break;
            case 'socialstudies':
                setSubject(subjects[2].name);
                fetchQuiz(subjects[2].id);
                break;
            case 'science':
                setSubject(subjects[3].name);
                fetchQuiz(subjects[3].id);
                break;
            case 'physics':
                setSubject(subjects[4].name);
                fetchQuiz(subjects[4].id);
                break;
            case 'chemistry':
                setSubject(subjects[5].name);
                fetchQuiz(subjects[5].id);
                break;
            case 'biology':
                setSubject(subjects[6].name);
                fetchQuiz(subjects[6].id);
                break;
            case 'emathematics':
                setSubject(subjects[7].name);
                fetchQuiz(subjects[7].id);
                break;
            default:
                setSubject('');
                break;
        }
    }

    /**
 * It fetches a quiz from the server, and if it fails, it uses the stored questions from the local
 * storage.
 * @param subjectIdNo - The subject id number of the subject the user is taking the quiz on.
 */
    const fetchQuiz = (subjectIdNo) => {
        getTakeQuizzes({ subjectId: subjectIdNo, questionNumber: 1000 }).then(
            (value) => {
                setSubjectIDNo(subjectIdNo);
                parseQuestion(value.data);
                setUploadButtonHidden(true);
                if (value.data.length !== 0) {
                    notifyQuestionUpload(value.message);
                }
            })
    }

    /**
     * It takes an array of objects, and returns an array of objects with the same keys, but with the
     * values of the key 'Answer' parsed.
     * @param value - the array of objects that I'm trying to parse
     */

    const parseQuestion = (value) => {
        const questions = value.map((question) => {
            let answer = parseAnswer(question);
            const data = {
                'Question': question.question,
                'Option A': question.options[0],
                'Option B': question.options[1],
                'Option C': question.options[2],
                'Option D': question.options[3],
                'Answer': answer,
            }
            return data;
        })
        setQuestions(questions);
    }

    /**
     * It takes a question object and returns a string representing the answer.
     * @param question - the question object
     * @returns A
     */

    const parseAnswer = (question) => {
        let answer = '';
        switch (question.answer) {
            case 1:
                answer = 'A';
                break;
            case 2:
                answer = 'B';
                break;
            case 3:
                answer = 'C';
                break;
            case 4:
                answer = 'D';
                break;
            default:
                break;
        }
        return answer;
    }


    const onUploadQuestion = (event) => {
        event.preventDefault();
        onUploadNotification();
    }

    const onDeleteAllQuestions = (event) => {
        event.preventDefault();
        deleteNofication();
    }

    return (
        <>
            <PanelHeader size="sm" />
            <div className="content">
                <Card>
                    <CardHeader>
                        <CardTitle tag="h4">{subject}</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Row>
                            {
                                (questions.length == 0) ?
                                    <Col xs={12}>
                                        <Form>
                                            <FormGroup>
                                                <Label for="excelFile" style={{ 'fontSize': '1em' }}>
                                                    File
                                                </Label>
                                                <Input
                                                    id="excelFile"
                                                    name="file"
                                                    type="file"
                                                    style={{ 'opacity': '1', 'position': 'relative' }}
                                                />
                                                <FormText>
                                                    Please upload an excel sheet containing your questions.
                                                </FormText>
                                            </FormGroup>
                                            <Button onClick={(event) => { onUploadExcelFile(event) }}>
                                                Submit
                                            </Button>
                                        </Form>
                                    </Col>
                                    :
                                    <Col xs={12}>
                                        <Button onClick={(event) => { onDeleteAllQuestions(event) }}>Delete</Button>
                                        {(!uploadButtonHidden) ? <Button color='primary' onClick={(event) => { onUploadQuestion(event) }}>Upload</Button> : ''}
                                        <Table hover responsive>
                                            <thead className="text-primary">
                                                <tr>
                                                    <th>
                                                        #
                                                    </th>
                                                    <th>
                                                        Question
                                                    </th>
                                                    <th>
                                                        Option A
                                                    </th>
                                                    <th>
                                                        Option B
                                                    </th>
                                                    <th>
                                                        Option C
                                                    </th>
                                                    <th>
                                                        Option D
                                                    </th>
                                                    <th>
                                                        Answer
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    questions.map((value, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <th scope="row">
                                                                    {++index}
                                                                </th>
                                                                <td>
                                                                    {value['Question']}
                                                                </td>
                                                                <td>
                                                                    {value['Option A']}
                                                                </td>
                                                                <td>
                                                                    {value['Option B']}
                                                                </td>
                                                                <td>
                                                                    {value['Option C']}
                                                                </td>
                                                                <td>
                                                                    {value['Option D']}
                                                                </td>
                                                                <td>
                                                                    {value['Answer']}
                                                                </td>
                                                            </tr>
                                                        );
                                                    })

                                                }

                                            </tbody>
                                        </Table>
                                    </Col>
                            }

                        </Row>
                    </CardBody>
                </Card>
            </div>
        </>
    )
}

export default Subjects


