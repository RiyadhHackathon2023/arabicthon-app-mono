import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Chip
} from "@material-tailwind/react";
import { useTranslation } from "react-i18next";
export function ProfileInfoCard({ title, description, details, status, action }) {
  const chips_status = {
    "Running" : "blue",
    "Pending" : "indigo",
    "Completed" : "green",
    "Failed" : "red",
    "Canceled" : "amber",
  }
  const { t } = useTranslation();

  return (
    <Card color="transparent" shadow={false}>
      <CardHeader
        color="transparent"
        shadow={false}
        floated={false}
        className="mx-0 mt-0 mb-4 flex items-center justify-between gap-4"
      >
        <Typography variant="h5" color="blue-gray" className="font-noto font-bold underline mb-3">
          {title}
        </Typography>
        {action}
      </CardHeader>
      <CardBody className="p-0  w-full flex flex-row ">
        
        {details && (
          <ul className="flex flex-col gap-4 p-0 min-w-2/3 ">
            {Object.keys(details).map((el, key) => (
              <li key={key} className="flex items-center gap-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold font-noto capitalize w-max"
                >
                  {el} :
                </Typography>
                {typeof details[el] === "string" ? (
                  <Typography
                    variant="small"
                    className="font-medium text-blue-gray-700 font-noto w-max bg-white"
                  >
                    {details[el]}
                  </Typography>
                ) : (
                  details[el]
                )}
              </li>
            ))}
            <li className="flex items-center gap-4">
            <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold font-noto capitalize"
                >
                  حالة العملية :
                </Typography>
            <Chip
                          variant="ghost"
                          color={chips_status[status]}
                          value={t(status)}
                          className="py-0.5 px-2 text-[13px] w-fit font-medium font-noto" 
                        />  
            </li>
          </ul>
        )}
        {description && details ? (
          <hr className="my-8 border-blue-gray-50" />
        ) : null}
        {description && (
          <div className="flex flex-col w-max  mr-10">
          <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-bold font-noto capitalize mb-2 w-max"
                >
            وصف العملية :
        </Typography>
        <Typography
            variant="small"
            className="font-normal text-blue-gray-700 font-noto"
          >
            {description}
          </Typography>
          </div>
          
        )}
        
      </CardBody>
    </Card>
  );
}

ProfileInfoCard.defaultProps = {
  action: null,
  description: null,
  details: {},
};

ProfileInfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.node,
  details: PropTypes.object,
};

ProfileInfoCard.displayName = "/src/widgets/cards/profile-info-card.jsx";

export default ProfileInfoCard;
