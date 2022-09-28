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


const Subjects = () => {

    /* Destructuring the `subjectName` from the `useParams` hook. */
    const { subjectName } = useParams();

    const [subject, setSubject] = useState('')
    const [questions, setQuestions] = useState([]);

    const subjects = useSelector(state => state.subject.value);
    const storedQuestions = useSelector(state => state.takeQuiz.quiz);

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
            console.log('value', value)
            setQuestions(value);
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
                dispatch(setTakeQuizState(value))
                parseQuestion(value);
            }).catch((err) => {
                if (storedQuestions.length !== 0) {
                    console.log('UseSelect', storedQuestions)
                    filterStoredQuestions(storedQuestions, subjectIdNo)
                }
            })
    }


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
            return data
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
            case 0:
                answer = 'A';
                break;
            case 1:
                answer = 'B';
                break;
            case 2:
                answer = 'C';
                break;
            case 3:
                answer = 'D';
                break;
            default:
                break;
        }
        return answer;
    }

    /**
     * FilterStoredQuestions() takes in a value and a subjectIdNo, and returns a filtered array of
     * questions based on the subjectIdNo.
     * @param value - the array of objects that I'm filtering through
     * @param subjectIdNo - The subject id number of the subject that was clicked on.
     */
    const filterStoredQuestions = (value, subjectIdNo) => {
        const questions = value.filter((question) => {
            return question.subject_id === subjectIdNo;
        })
        parseQuestion(questions);
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
                                                        Answer No.
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    questions.map((value, index) => {
                                                        console.log('Value', value);
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


