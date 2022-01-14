type ApplicantName = string;
type PhoneNumber = string;
type EmailAddress = string;
type BirthDate = DateString;
type UserPhoto = Image;

type KnownSpecialty = "engineer" | "scientist" | "psychologist";
type UnknownSpecialty = string;
type ExperienceYears = NumberLike;

type Password = string;

export { KnownSpecialty };
export type ApplicationForm = {
  name: ApplicantName;
  phone: PhoneNumber;
  email: EmailAddress;
  birthDate: BirthDate;
  photo: UserPhoto;

  specialty: KnownSpecialty;
  customSpecialty: UnknownSpecialty;
  experience: ExperienceYears;

  password: Password;
};
