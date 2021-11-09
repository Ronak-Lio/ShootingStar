import React, { useState } from "react";
import "./Test_Prepsat.css";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import Button from "@mui/material/Button";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import HomeFooter from "../Home/HomeFooter";
import Header from "../Header/Header";
import Title from "../Courses/CourseArchieve/Title";

function Test_Prep() {
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);
  const [visible4, setVisible4] = useState(false);
  const [visible5, setVisible5] = useState(false);
  const [visible6, setVisible6] = useState(false);
  const [visible7, setVisible7] = useState(false);
  const [visible8, setVisible8] = useState(false);
  const [visible9, setVisible9] = useState(false);
  const [visible10, setVisible10] = useState(false);
  const [visible11, setVisible11] = useState(false);
  const [visible12, setVisible12] = useState(false);
  const [visible13, setVisible13] = useState(false);
  const [visible14, setVisible14] = useState(false);
  const [visible15, setVisible15] = useState(false);
  const [visible16, setVisible16] = useState(false);
  const [visible17, setVisible17] = useState(false);
  const [visible18, setVisible18] = useState(false);
  const [visible19, setVisible19] = useState(false);
  const [visible20, setVisible20] = useState(false);
  const [visible21, setVisible21] = useState(false);
  const [visible22, setVisible22] = useState(false);

  return (
    <div className="test">
      <Header/>
     <Title title={"TEST PREPARATION"}/>
      {/*  */}

      <div className="test_first">
        <h4 className="text_first_h4">
          Private SAT tutoring in Dubai, Sharjah and Abu Dhabi
        </h4>
        <p className="text_first_p">
          We offer private online SAT tutoring to students across the UAE and
          around the world.
        </p>
        <p className="text_first_p">
          Our tutors have all scored at least in the 98th percentile in the
          SATs, and have extensive experience tutoring students for the SATs to
          gain entry to College.
        </p>
      </div>

      {/*  */}
      <div className="test_second">
        <h4 className="text_first_h4">SAT Preparation classes in UAE</h4>
        <p className="text_first_p">
          For SAT classes in UAE, the student can choose from the following
          variants:
        </p>
      </div>

      {/*  */}
      <div className="table_test">
        <table>
          {/* <tr>
            <th>
              <div className="test_table_Name">Company</div>
            </th>
            <th>
              <div className="test_table_Name">Contact</div>
            </th>
            <th>
              <div className="test_table_Name">Country</div>
            </th>
          </tr> */}
          <tr>
            <td className="test_table_Name">SAT Small Group Batches</td>
            <td className="test_table_P">
              We offer personalised SAT prep customised to students’ needs,
              schedules, goals, and learning styles. We offer reliability and
              flexibility along with guaranteed score improvement from our
              expert instructors who are adept at working with students with
              wide varieties of learning styles and academic goals.
              <p>We offer the following:</p>
              <ul>
                <li>
                  Private SAT tutoring for small groups of no more than 4
                  students.
                </li>
                <li>
                  Course spanning over 20 hours per subject (not including
                  practice tests).
                </li>
                <li>
                  1 Verbal and 1 Math class per week, each of duration 2 hours.
                </li>
                <li>Unlimited extra help from our instructors.</li>
                <li>
                  Access to our carefully compiled bank of practice questions
                  and practice tests.
                </li>
              </ul>
            </td>
            <td className="test_table_Button">
              {" "}
              <Button variant="contained" size="large">
                BOOK A SEAT
              </Button>
            </td>
          </tr>
          <tr>
            <td className="test_table_Name">
              SAT Private Tutoring (One-On-One)
            </td>
            <td className="test_table_P">
              We offer personalised SAT prep customised to students’ needs,
              schedules, goals, and learning styles. We offer reliability and
              flexibility along with guaranteed score improvement from our
              expert instructors who are adept at working with students with
              wide varieties of learning styles and academic goals.
              <p>We offer the following:</p>
              <ul>
                <li>One to one private SAT tutoring.</li>
                <li>
                  Course spanning over 20 hours per subject (not including
                  practice tests).
                </li>
                <li>
                  1 Verbal and 1 Math class per week, each of duration 2 hours.
                </li>
                <li>Unlimited extra help from our instructors.</li>
                <li>
                  Access to our carefully compiled bank of practice questions
                  and practice tests.
                </li>
              </ul>
            </td>
            <td className="test_table_Button">
              {" "}
              <Button variant="contained" size="large">
                BOOK A SEAT
              </Button>
            </td>
          </tr>
        </table>
      </div>

      <div className="FAQs">
        {/* <div className="FAQs_Next"> */}
        <div className="FAQs_header">FAQs</div>
        <div className="FAQs_body">
          <div className="FAQs_body_Q" onClick={() => setVisible1(!visible1)}>
            <div className="FAQs_Box">
              <div className="FAQs_Box1">What is SAT?</div>
              <div className="FAQs_Box2">
                {visible1 ? (
                  <ArrowDropUpRoundedIcon fontSize="large" />
                ) : (
                  <ArrowDropDownRoundedIcon fontSize="large" />
                )}
              </div>
            </div>
            <div className={visible1 ? "FAQs_Box_CO" : "FAQs_Box_C"}>
              SAT, earlier called as Scholastic Aptitude test is a standardized
              test. SAT is an admissions requirement for most Under Graduate
              colleges in the USA.
            </div>
          </div>
        </div>

        <div className="FAQs_body">
          <div className="FAQs_body_Q" onClick={() => setVisible2(!visible2)}>
            <div className="FAQs_Box">
              <div className="FAQs_Box1">Who Conducts SAT?</div>
              <div className="FAQs_Box2">
                {visible2 ? (
                  <ArrowDropUpRoundedIcon fontSize="large" />
                ) : (
                  <ArrowDropDownRoundedIcon fontSize="large" />
                )}
              </div>
            </div>
            <div className={visible2 ? "FAQs_Box_CO" : "FAQs_Box_C"}>
              SAT is administered by College Board, a private non profit
              organization in USA.
            </div>
          </div>
        </div>
        <div className="FAQs_body">
          <div className="FAQs_body_Q" onClick={() => setVisible3(!visible3)}>
            <div className="FAQs_Box">
              <div className="FAQs_Box1">Who writes SAT?</div>
              <div className="FAQs_Box2">
                {visible3 ? (
                  <ArrowDropUpRoundedIcon fontSize="large" />
                ) : (
                  <ArrowDropDownRoundedIcon fontSize="large" />
                )}
              </div>
            </div>
            <div className={visible3 ? "FAQs_Box_CO" : "FAQs_Box_C"}>
              SAT is written by school students in their 11th grade (Junior) or
              12th grade (Senior) for admissions into Under Graduate colleges in
              the USA & elsewhere across the globe.
            </div>
          </div>
        </div>

        <div className="FAQs_body">
          <div className="FAQs_body_Q" onClick={() => setVisible4(!visible4)}>
            <div className="FAQs_Box">
              <div className="FAQs_Box1">
                What is the test duration of the SAT?
              </div>
              <div className="FAQs_Box2">
                {visible4 ? (
                  <ArrowDropUpRoundedIcon fontSize="large" />
                ) : (
                  <ArrowDropDownRoundedIcon fontSize="large" />
                )}
              </div>
            </div>
            <div className={visible4 ? "FAQs_Box_CO" : "FAQs_Box_C"}>
              The time duration for SAT is usually three hours and thirty
              minutes inclusive of all the breaks. In the given time period, the
              students taking the test are supposed to complete all the four
              sections.
              <li>Reading Test – 65 minutes</li>
              <li>Writing & Language Test – 35 minutes</li>
              <li>Math Test (No Calculator Section) – 25 minutes</li>
              <li>Math Test (Calculator Section) – 55 minutes</li>
              <li>Essay – 50 minutes</li>
            </div>
          </div>
        </div>
        <div className="FAQs_body">
          <div className="FAQs_body_Q" onClick={() => setVisible5(!visible5)}>
            <div className="FAQs_Box">
              <div className="FAQs_Box1">
                How many questions are there on SAT?
              </div>
              <div className="FAQs_Box2">
                {visible5 ? (
                  <ArrowDropUpRoundedIcon fontSize="large" />
                ) : (
                  <ArrowDropDownRoundedIcon fontSize="large" />
                )}
              </div>
            </div>
            <div className={visible5 ? "FAQs_Box_CO" : "FAQs_Box_C"}>
              A total of 80 questions are on the SAT. The examination question
              pattern is divided into the following sections
              <li>Reading Test – 52 questions</li>
              <li>Writing & Language Test – 44 questions</li>
              <li>Math Test (No Calculator Section) – 20 questions</li>
              <li>Math Test (Calculator Section)– 38 questions</li>
              <li>Essay – 1 Topic</li>
            </div>
          </div>
        </div>

        <div className="FAQs_body">
          <div className="FAQs_body_Q" onClick={() => setVisible6(!visible6)}>
            <div className="FAQs_Box">
              <div className="FAQs_Box1">What is the score distribution of SAT?</div>
              <div className="FAQs_Box2">
                {visible6 ? (
                  <ArrowDropUpRoundedIcon fontSize="large" />
                ) : (
                  <ArrowDropDownRoundedIcon fontSize="large" />
                )}
              </div>
            </div>
            <div className={visible6 ? "FAQs_Box_CO" : "FAQs_Box_C"}>
              The score distribution of SAT in each section is as follows
              <li>
                Reading Test & Writing & Language Test – 200 – 800 with an
                increment of 10
              </li>
              <li>
                Math Test (Calculator & No Calculator Section) – 200 – 800 with
                an increment of 10
              </li>
              <li>Essay – 2 – 8, with an increment of 1</li>
            </div>
          </div>
        </div>
        <div className="FAQs_body">
          <div className="FAQs_body_Q" onClick={() => setVisible7(!visible7)}>
            <div className="FAQs_Box">
              <div className="FAQs_Box1">What is the General Test Structure and Time Allowed for SAT?</div>
              <div className="FAQs_Box2">
                {visible7 ? (
                  <ArrowDropUpRoundedIcon fontSize="large" />
                ) : (
                  <ArrowDropDownRoundedIcon fontSize="large" />
                )}
              </div>
            </div>
            <div className={visible7 ? "FAQs_Box_CO" : "FAQs_Box_C"}>
              <li>Reading Test – 52 questions, 65 minutes</li>
              <li>Writing & Language Test – 44 questions, 35 minutes</li>
              <li>
                Math Test (No Calculator Section) – 20 questions, 25 minutes
              </li>
              <li>Math Test (Calculator Section) – 55 minutes</li>
              <li>Essay – 1 Topic, 50 minutes</li>
            </div>
          </div>
        </div>

        <div className="FAQs_body">
          <div className="FAQs_body_Q" onClick={() => setVisible8(!visible8)}>
            <div className="FAQs_Box">
              <div className="FAQs_Box1">What is the question pattern?</div>
              <div className="FAQs_Box2">
                {visible8 ? (
                  <ArrowDropUpRoundedIcon fontSize="large" />
                ) : (
                  <ArrowDropDownRoundedIcon fontSize="large" />
                )}
              </div>
            </div>
            <div className={visible8 ? "FAQs_Box_CO" : "FAQs_Box_C"}>
            For the SAT, the question pattern is divided as follows
              <li>Reading Test – Multiple-choice Questions</li>
              <li>Writing & Language Test – Multiple-choice Questions</li>
              <li>Math Test (No Calculator Section) – Multiple-choice Questions</li>
              <li>Math Test (Calculator Section) –Multiple-choice Questions</li>
              <li>Essay – Essay Writing</li>
            </div>
          </div>
        </div>
        <div className="FAQs_body">
          <div className="FAQs_body_Q" onClick={() => setVisible9(!visible9)}>
            <div className="FAQs_Box">
              <div className="FAQs_Box1">What are the sections of SAT?</div>
              <div className="FAQs_Box2">
                {visible9 ? (
                  <ArrowDropUpRoundedIcon fontSize="large" />
                ) : (
                  <ArrowDropDownRoundedIcon fontSize="large" />
                )}
              </div>
            </div>
            <div className={visible9 ? "FAQs_Box_CO" : "FAQs_Box_C"}>
            As mentioned earlier, SAT is divided into five sections.
              <li>Reading Test – 5 Passages from the following topics</li>
              <li>One passage from a classic or contemporary work of U.S. or world literature,</li>
              <li>
              One passage or a pair of passages from either a U.S. founding document or a text in the Great Global Conversation they inspired,
              </li>
              <li>
              One passage on economics, psychology, sociology, or some other social science,
              </li>
              <li>Two science passages (or one passage and one passage pair) that examine foundational concepts and developments in Earth science, biology, chemistry, or physics</li>
              <li>Writing & Language Test – measures a range of skills</li>
              <li>Command of Evidence</li>
              <li>Words in Context</li>
              <li>Analysis in History/Social Studies and in Science</li>
              <li>Expression of Ideas</li>
              <li>Standard English Conventions</li>
              <li>Math Test –</li>
              <li>Problem Solving and Data Analysis</li>
              <li>Passport to Advanced Math</li>
              <li>Essay –</li>
            </div>
          </div>
        </div>

        <div className="FAQs_body">
          <div className="FAQs_body_Q" onClick={() => setVisible10(!visible10)}>
            <div className="FAQs_Box">
              <div className="FAQs_Box1">What is the SAT test environment?</div>
              <div className="FAQs_Box2">
                {visible10 ? (
                  <ArrowDropUpRoundedIcon fontSize="large" />
                ) : (
                  <ArrowDropDownRoundedIcon fontSize="large" />
                )}
              </div>
            </div>
            <div className={visible10 ? "FAQs_Box_CO" : "FAQs_Box_C"}>
            SAT is a paper-based test.
            </div>
          </div>
        </div>
        <div className="FAQs_body">
          <div className="FAQs_body_Q" onClick={() => setVisible11(!visible11)}>
            <div className="FAQs_Box">
              <div className="FAQs_Box1">When is the SAT score published?</div>
              <div className="FAQs_Box2">
                {visible11? (
                  <ArrowDropUpRoundedIcon fontSize="large" />
                ) : (
                  <ArrowDropDownRoundedIcon fontSize="large" />
                )}
              </div>
            </div>
            <div className={visible11 ? "FAQs_Box_CO" : "FAQs_Box_C"}>
            Since SAT is a paper-based test, it requires time for scoring, the official test score would be available 20 days after the test date.
            </div>
          </div>
        </div>

        <div className="FAQs_body">
          <div className="FAQs_body_Q" onClick={() => setVisible12(!visible12)}>
            <div className="FAQs_Box">
              <div className="FAQs_Box1">Can I cancel the SAT test scores after taking the test?</div>
              <div className="FAQs_Box2">
                {visible12 ? (
                  <ArrowDropUpRoundedIcon fontSize="large" />
                ) : (
                  <ArrowDropDownRoundedIcon fontSize="large" />
                )}
              </div>
            </div>
            <div className={visible12 ? "FAQs_Box_CO" : "FAQs_Box_C"}>
            Yes. If you wish to cancel the test scores after writing the test, you can do it in one of the two ways –
            <li>At the test center, after administering the test ask the exam supervisor for a request to cancel test scores form. Fill the details with your signature and return the form to the supervisor before leaving the test center.</li>
            <li>
            After leaving the test center, your written, signed request must be received no later than 11:59 p.m. ET on the Thursday after the test date.
            </li>
            Complete the SAT Request to Cancel Scores form (.pdf/92KB) or write your request. You must provide the following information to cancel your scores:
            <li>Test date</li>
            <li>Test center number</li>
            <li>Name of test you are canceling—either the SAT or SAT Subject Test(s)</li>
            <li>Name, address, sex, birth date and registration number</li>
            <li>Signature (required or the cancellation will not be processed)</li>
            You can’t submit cancellation requests by phone or e-mail because your signature is required.
            </div>
          </div>
        </div>
        <div className="FAQs_body">
          <div className="FAQs_body_Q" onClick={() => setVisible13(!visible13)}>
            <div className="FAQs_Box">
              <div className="FAQs_Box1">How to send official SAT Score reports to recipient colleges?</div>
              <div className="FAQs_Box2">
                {visible13 ? (
                  <ArrowDropUpRoundedIcon fontSize="large" />
                ) : (
                  <ArrowDropDownRoundedIcon fontSize="large" />
                )}
              </div>
            </div>
            <div className={visible13 ? "FAQs_Box_CO" : "FAQs_Box_C"}>
            You will be asked to designate 4 free recipient colleges for your official SAT score report until 9 days after you have administered the test. For every Additional score report recipient college, candidates will be charged a fee of $12.
            </div>
          </div>
        </div>

        <div className="FAQs_body">
          <div className="FAQs_body_Q" onClick={() => setVisible14(!visible14)}>
            <div className="FAQs_Box">
              <div className="FAQs_Box1">Can I choose the SAT scores that should be sent to the colleges?</div>
              <div className="FAQs_Box2">
                {visible14 ? (
                  <ArrowDropUpRoundedIcon fontSize="large" />
                ) : (
                  <ArrowDropDownRoundedIcon fontSize="large" />
                )}
              </div>
            </div>
            <div className={visible14 ? "FAQs_Box_CO" : "FAQs_Box_C"}>
            Yes. SAT provides the option to choose from one or many of the test taken as you like from the past tests administered. Keep in mind that some of the under graduate colleges and certain scholarship programs require students to send all their SAT scores.
            </div>
          </div>
        </div>
        <div className="FAQs_body">
          <div className="FAQs_body_Q" onClick={() => setVisible15(!visible15)}>
            <div className="FAQs_Box">
              <div className="FAQs_Box1">How long is SAT score valid?</div>
              <div className="FAQs_Box2">
                {visible15 ? (
                  <ArrowDropUpRoundedIcon fontSize="large" />
                ) : (
                  <ArrowDropDownRoundedIcon fontSize="large" />
                )}
              </div>
            </div>
            <div className={visible15 ? "FAQs_Box_CO" : "FAQs_Box_C"}>
            SAT score is valid for five years.
            </div>
          </div>
        </div>
        <div className="FAQs_body">
          <div className="FAQs_body_Q" onClick={() => setVisible16(!visible16)}>
            <div className="FAQs_Box">
              <div className="FAQs_Box1">How many times is the SAT administered in a year?</div>
              <div className="FAQs_Box2">
                {visible16 ? (
                  <ArrowDropUpRoundedIcon fontSize="large" />
                ) : (
                  <ArrowDropDownRoundedIcon fontSize="large" />
                )}
              </div>
            </div>
            <div className={visible16 ? "FAQs_Box_CO" : "FAQs_Box_C"}>
            SAT is a paper-based test administered 4 times in a year in the UAE.
            </div>
          </div>
        </div>
        <div className="FAQs_body">
          <div className="FAQs_body_Q" onClick={() => setVisible17(!visible17)}>
            <div className="FAQs_Box">
              <div className="FAQs_Box1">Eligibility criteria for SAT?</div>
              <div className="FAQs_Box2">
                {visible17 ? (
                  <ArrowDropUpRoundedIcon fontSize="large" />
                ) : (
                  <ArrowDropDownRoundedIcon fontSize="large" />
                )}
              </div>
            </div>
            <div className={visible17 ? "FAQs_Box_CO" : "FAQs_Box_C"}>
            School students planning to study in the Under Graduate colleges across USA & UAE write the SAT. Even some of the Under Graduate colleges from many other countries have started accepting SAT score for admissions.<br/>Age is no bar<br/>Not all universities require SAT scores for admissions. Candidates should check with the rules and guidelines of the university to understand their requirement.
            </div>
          </div>
        </div>
        <div className="FAQs_body">
          <div className="FAQs_body_Q" onClick={() => setVisible18(!visible18)}>
            <div className="FAQs_Box">
              <div className="FAQs_Box1">When should I write the SAT test?</div>
              <div className="FAQs_Box2">
                {visible18 ? (
                  <ArrowDropUpRoundedIcon fontSize="large" />
                ) : (
                  <ArrowDropDownRoundedIcon fontSize="large" />
                )}
              </div>
            </div>
            <div className={visible18 ? "FAQs_Box_CO" : "FAQs_Box_C"}>
            There is no specific time for writing the SAT test. The School students can take it during their 11th grade (Junior) or 12th grade (Senior) to apply for Under Graduate program. Students should plan to take their SAT test at least 3 months before the application due dates. If you add another minimum duration of 3 months for SAT preparation, one should start his/her SAT preparation at least 6 months before the application deadline.
            </div>
          </div>
        </div>
        <div className="FAQs_body">
          <div className="FAQs_body_Q" onClick={() => setVisible19(!visible19)}>
            <div className="FAQs_Box">
              <div className="FAQs_Box1">How many times can the candidate take SAT?</div>
              <div className="FAQs_Box2">
                {visible19 ? (
                  <ArrowDropUpRoundedIcon fontSize="large" />
                ) : (
                  <ArrowDropDownRoundedIcon fontSize="large" />
                )}
              </div>
            </div>
            <div className={visible19 ? "FAQs_Box_CO" : "FAQs_Box_C"}>
            In a span of one year, the student is entitled to take SAT four times.
            </div>
          </div>
        </div>
        <div className="FAQs_body">
          <div className="FAQs_body_Q" onClick={() => setVisible20(!visible20)}>
            <div className="FAQs_Box">
              <div className="FAQs_Box1">What are the benefits of SAT?</div>
              <div className="FAQs_Box2">
                {visible20 ? (
                  <ArrowDropUpRoundedIcon fontSize="large" />
                ) : (
                  <ArrowDropDownRoundedIcon fontSize="large" />
                )}
              </div>
            </div>
            <div className={visible20 ? "FAQs_Box_CO" : "FAQs_Box_C"}>
            Most of the reputed Under Graduate colleges in the USA and around the world consider the SAT score as a mandatory requirement in the admissions process. This test enables the Under Graduate school to assess the Analytical, Verbal & Quantitative ability of the candidates applying. Apart from that, good SAT score also helps a student have a better chance of earning scholarships.
            </div>
          </div>
        </div>
        <div className="FAQs_body">
          <div className="FAQs_body_Q" onClick={() => setVisible21(!visible21)}>
            <div className="FAQs_Box">
              <div className="FAQs_Box1">What is the SAT Exams Fees Structure?</div>
              <div className="FAQs_Box2">
                {visible21 ? (
                  <ArrowDropUpRoundedIcon fontSize="large" />
                ) : (
                  <ArrowDropDownRoundedIcon fontSize="large" />
                )}
              </div>
            </div>
            <div className={visible21 ? "FAQs_Box_CO" : "FAQs_Box_C"}>
            <li>SAT (without essay) – $47.5</li>
            <li>SAT (with essay) – $64.5</li>
            Apart from this, the students may need to pay additional charges in the following cases
            <li>Late registration fee – $29</li>
            <li>Change Fee – $29</li>
            </div>
          </div>
        </div>
        <div className="FAQs_body">
          <div className="FAQs_body_Q" onClick={() => setVisible22(!visible22)}>
            <div className="FAQs_Box">
              <div className="FAQs_Box1">How to register for SAT?</div>
              <div className="FAQs_Box2">
                {visible22 ? (
                  <ArrowDropUpRoundedIcon fontSize="large" />
                ) : (
                  <ArrowDropDownRoundedIcon fontSize="large" />
                )}
              </div>
            </div>
            <div className={visible22 ? "FAQs_Box_CO" : "FAQs_Box_C"}>
            Interested candidates may register for SAT through the mail, phone, fax and even online. The candidate may follow the online registration process –
            <li>The candidate should create an account in the college board website</li>
            <li>Complete the registration form</li>
            <li>Select the Date and Location for Test</li>
            <li>Make a payment of $47.5 for SAT (without essay) or $64.5 for SAT (with essay) as registration charge for SAT Test</li>
            </div>
          </div>
        </div>
      </div>
      <HomeFooter />
    </div>
  );
}

export default Test_Prep;