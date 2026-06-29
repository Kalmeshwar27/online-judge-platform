export interface Problem {
  id: number;
  title: string;
  description?: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  time_limit_ms?: number;
  memory_limit_kb?: number;
  created_at?: string;
}

export interface TestCase {
  id: number;
  problem_id: number;
  input: string;
  expected_output: string;
  is_sample: boolean;
}

export interface TestCaseResult {
  test_case_id: number;
  is_sample: boolean;
  status: string;
}

export interface Submission {
  id: number;
  user_id: number | null;
  problem_id: number;
  code: string;
  language: 'python' | 'java';
  verdict: string;
  failed_test_case_id: number | null;
  execution_time_ms: number | null;
  memory_used_kb: number | null;
  total_test_cases: number | null;
  passed_test_cases: number | null;
  test_case_results: TestCaseResult[];
  submitted_at: string;
}