export class CreateProgramkerjaDto {
  id_program: number;
  ketua_pelaksana: number;
  sekertaris_pelaksana: number;
  bendahara_pelaksana: number;
  status: string;
  notulensi_rapat: File | null;
  sekertaris_pelaksana2: number;
  bendahara_pelaksana2: number;
  nama_program: string;
  tanggal_pelaksanaan: Date;
}
