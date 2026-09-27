import { Button } from "@base-ui/react/button";
import { useNavigate } from "react-router-dom";

// sau làm landing page
export default function HomePage() {
  const navigate = useNavigate();
  const navTemp = () => {
    navigate("/student-classes");
  }
  return <div>
    <Button
      className={"bg-primary size-50 text-white"}
      onClick={() => navTemp()}
    >
      click me
    </Button>
  </div >;
}