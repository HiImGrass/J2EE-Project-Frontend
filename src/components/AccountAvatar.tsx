import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { Image } from "./ui/image";
import authService from "@/features/auth/api/auth.service";
import { useNavigate } from "react-router-dom";

const AccountControls = [
    {
        key: "manage_account",
        text: "Quản lý tài khoản"
    },
    {
        key: "my_class",
        text: "Lớp học của tôi"
    },
    {
        key: "log_out",
        text: "Đăng xuất"
    },
]

export function AccountAvatar() {
    const navigate = useNavigate();

    const handleClickAvatar = (key: string) => {
        switch (key) {
            case "manage_account":
                manageAccount()
                break;
            case "my_class":
                myClass()
                break;
            case "log_out":
                void logOut();
                break;

            default:
                break;
        }
    }

    const manageAccount = () => {

    }

    const myClass = () => {
        navigate("/student-classes");
    }

    const logOut = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error("Đăng xuất khỏi máy chủ thất bại:", error);
        } finally {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            navigate("/login", { replace: true });
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Image publicId='type_avatar_initials_eqexyi' />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
                {
                    AccountControls.map((item) => {
                        return (
                            <DropdownMenuItem key={item.key} className="px-4 py-2 active:bg-accent" onClick={() => handleClickAvatar(item.key)}>
                                {item.text}
                            </DropdownMenuItem>
                        )
                    })
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}