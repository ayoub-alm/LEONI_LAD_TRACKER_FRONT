interface Project {
    id: number;
    name: string;
    ref: string;
    created_by: number;
  }
  
  interface Segment {
    id: number;
    name: string;
    project_id: number;
    project: Project;
    sum_of_hc_of_lines: number;
  }
  
  interface Line {
    id: number;
    name: string;
    number_of_operators: number;
    database_path: string;
    segment: Segment;
  }
  
 export interface TotalCountApiResponse {
    line: Line;
    total_quantity: number;
  }
  
  export interface SumByRefApiResponse {
    line: Line;
    Code_fournisseur: string;
    total_quantity: number;
  }
