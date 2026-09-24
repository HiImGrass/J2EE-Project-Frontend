import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "./ui/dropdown-menu";
import { Image } from "./ui/image";

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

    const handleClickAvatar = (key: string) => {
        switch (key) {
            case "manage_account":
                manageAccount()
                break;
            case "my_class":
                myClass()
                break;
            case "log_out":
                logOut();
                break;

            default:
                break;
        }
    }

    const manageAccount = () => {

    }

    const myClass = () => {

    }

    const logOut = () => {

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