import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { Image } from "./ui/image";
import authService from "@/features/auth/api/auth.service";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/auth.store";

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
    const clearAuth = useAuthStore((state) => state.clearAuth);
    const user = useAuthStore((state) => state.user);
    const role = user?.role?.toUpperCase();
    const accountControls = AccountControls.filter(
        (item) => item.key !== "my_class" || (role !== "ADMIN" && role !== "TEACHER"),
    );

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
        const refreshToken = localStorage.getItem("refreshToken");
        try {
            await authService.logout(refreshToken);
        } catch (error) {
            console.error("Đăng xuất khỏi máy chủ thất bại:", error);
        } finally {
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("authUsername");
            clearAuth();
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
                    accountControls.map((item) => {
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
