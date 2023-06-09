import React, { useState } from "react";
import { format } from "date-fns";
import { Autocomplete, createStyles, Tab, Tabs, TextField, Theme, useTheme } from "@mui/material";
import makeClasses from "../helpers/makeClasses";
import { useGetAllResidents, useGetResident } from "./Home.db";
import { Loading } from "../components/Loading";

const useStyles = makeClasses((theme: Theme) =>
  createStyles({
    contentContainer: {
      marginTop: "20px",
      display: "flex",
      flexDirection: "column",
      columnGap: "20px",
      width: "100%",
      flex: "1 1 auto",
      justifyContent: "center",
    },
    residentSelect: {
      display: "flex",
      flex: "0 0 auto",
      justifyContent: "center",
    },
    residentContainer: {
      marginTop: "20px",
      display: "flex",
      flexDirection: "column",
      columnGap: "20px",
      width: "100%",
      flex: "1 1 auto",
      alignItems: "center",
    },
    residentDataContainer: {
      width: "500px",
      display: "grid",
      columnGap: "15px",
      rowGap: "5px",
      gridTemplateColumns: "auto 1fr",
      alignItems: "center",
      marginBottom: "20px",
    },
    residentLabel: {
      fontWeight: "bold",
      textAlign: "right",
    },
    residentData: {},
    recommendProgramsTitle: {
      fontSize: "1.2em",
      fontWeight: "bold",
      marginBottom: "10px",
    },
  }),
);

export const Home: React.FC = props => {
  const theme = useTheme();
  const classes = useStyles(theme, props);
  const [resident, setResident] = useState<ResidentOptions | null>(null);

  const { data, error, loading, networkStatus, refetch } = useGetAllResidents();

  if (loading) return <Loading size="100%" />;
  if (error) return <Loading size="100%" line1="There was an error fetching residents" line2={error.message} />;

  const handleResidentChange = (event: React.SyntheticEvent, value: any) => {
    setResident(value);
  };

  const options =
    data?.getAllResidents?.map(item => ({
      label: item.name,
      userId: item.userId,
    })) ?? [];

  return (
    <div className={classes.contentContainer}>
      <div className={classes.residentSelect}>
        <Autocomplete
          disablePortal
          id="resident-list"
          options={options}
          sx={{ width: "300px" }}
          value={resident}
          onChange={handleResidentChange}
          renderInput={params => <TextField {...params} label="Choose a resident:" InputLabelProps={{ shrink: true }} />}
        />
      </div>
      {resident && <Resident userId={resident.userId} />}
    </div>
  );
};

interface ResidentOptions {
  label: string;
  userId: string;
}

interface ResidentProps {
  userId: string;
}

export const Resident: React.FC<ResidentProps> = props => {
  const theme = useTheme();
  const classes = useStyles(theme, props);
  const { userId } = props;

  const { data, error, loading, networkStatus, refetch } = useGetResident(userId);

  if (loading) return <Loading size="100%" />;
  if (error) return <Loading size="100%" line1="There was an error fetching residents" line2={error.message} />;

  return (
    <div className={classes.residentContainer}>
      <div className={classes.residentDataContainer}>
        <div className={classes.residentLabel}>Name:</div>
        <div className={classes.residentData}>{data?.findResidentById.name}</div>
        <div className={classes.residentLabel}>Gender:</div>
        <div className={classes.residentData}>{data?.findResidentById.gender}</div>
        <div className={classes.residentLabel}>Birthday:</div>
        <div className={classes.residentData}>{data?.findResidentById?.birthday ? format(new Date(data?.findResidentById?.birthday), "yyyy-MM-dd hh:mm:ss a") : ""}</div>
        <div className={classes.residentLabel}>Move In Date:</div>
        <div className={classes.residentData}>{data?.findResidentById?.moveInDate ? format(new Date(data?.findResidentById?.moveInDate), "yyyy-MM-dd hh:mm:ss a") : ""}</div>
        <div className={classes.residentLabel}>Level Of Care:</div>
        <div className={classes.residentData}>{data?.findResidentById.levelOfCare}</div>
        <div className={classes.residentLabel}>Hobbies:</div>
        <div className={classes.residentData}>{data?.findResidentById?.hobbies?.join(", ")}</div>
        <div className={classes.residentLabel}>Room Number:</div>
        <div className={classes.residentData}>{data?.findResidentById.roomNumber}</div>
      </div>
      <div className={classes.recommendProgramsTitle}>Recommended Programs:</div>
      {data?.findResidentById?.recommendedPrograms &&
        data?.findResidentById?.recommendedPrograms.map((program, index) => (
          <div key={index} className={classes.residentDataContainer}>
            <div className={classes.residentLabel}>Name:</div>
            <div className={classes.residentData}>{program.name}</div>
            <div className={classes.residentLabel}>Mode:</div>
            <div className={classes.residentData}>{program.mode}</div>
            <div className={classes.residentLabel}>Start Date:</div>
            <div className={classes.residentData}>{program.start ? format(new Date(program.start), "yyyy-MM-dd hh:mm:ss a") : ""}</div>
            <div className={classes.residentLabel}>End Date:</div>
            <div className={classes.residentData}>{program.end ? format(new Date(program.end), "yyyy-MM-dd hh:mm:ss a") : ""}</div>
            <div className={classes.residentLabel}>Dimensions:</div>
            <div className={classes.residentData}>{program.dimensions?.join(", ")}</div>
            <div className={classes.residentLabel}>Facilitators:</div>
            <div className={classes.residentData}>{program.facilitators?.join(", ")}</div>
            <div className={classes.residentLabel}>Hobbies:</div>
            <div className={classes.residentData}>{program.hobbies?.join(", ")}</div>
            <div className={classes.residentLabel}>Levels Of Care:</div>
            <div className={classes.residentData}>{program.levelsOfCare?.join(", ")}</div>
          </div>
        ))}
    </div>
  );
};
