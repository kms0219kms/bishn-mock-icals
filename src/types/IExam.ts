export interface IExam {
  id: number;

  subject: string;
  paperType: string;

  date: string;
  startTime: string;
  duration: number;

  location: string;
}

export default IExam;
