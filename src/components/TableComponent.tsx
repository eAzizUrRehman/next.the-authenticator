import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';

export interface Header {
  id: string;
  name: string;
  className?: string;
}

interface DataItem {
  _id?: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  zip: string;
}
interface TableComponentProps {
  caption: string;
  headers: Header[];
  data: DataItem[];
  onDelete: (id: string) => void;
}

const TableComponent: React.FC<TableComponentProps> = ({
  caption,
  headers,
  data,
  onDelete,
}) => {
  return (
    <div className="relative size-full rounded-xl border border-gray-500 px-5 py-2">
      <Table>
        <TableCaption className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {caption}
        </TableCaption>
        <TableHeader>
          <TableRow>
            {headers?.map((header) => (
              <TableHead key={header.id} className={header.className}>
                {header.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length > 0 ? (
            <>
              {data?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="">{item?.name}</TableCell>
                  <TableCell className="">{item?.email}</TableCell>
                  <TableCell className="">{item?.phone}</TableCell>
                  <TableCell className="">{item?.country}</TableCell>
                  <TableCell className="">{item?.city}</TableCell>
                  <TableCell className="">{item?.zip}</TableCell>
                  <TableCell className="flex justify-center">
                    <button
                      className=""
                      onClick={() => onDelete(item._id as string)}
                    >
                      <Image
                        src="/icons/delete-icon.svg"
                        alt="edit icon"
                        className="dark:opacity-70 dark:invert"
                        width={16}
                        height={16}
                      />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </>
          ) : (
            <TableRow>
              <TableCell colSpan={headers.length} className="pt-5 text-center">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableComponent;
