import { ObjectType } from "typescript";

interface ObjectModelProps {
    editedObject: any;
    originalObject?: any;
    categories?: any[];
    onUpdate: (id: number, object: any) => Promise<void>;
    cancel: () => void;
    FormComponent: React.FC<any>;
    title: string;
}
  
export const CreateModal: React.FC<ObjectModelProps> = ({editedObject, originalObject, categories, onUpdate, cancel, FormComponent, title}) => {
    return (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">{title}</h3>
                        <FormComponent
                            onSubmit={(_object: ObjectType) => onUpdate(editedObject.id, _object)}
                            categories={categories}
                            FormComponent={editedObject}
                            originalObject={originalObject}
                        />
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button 
                        onClick={cancel}
                        type="button"
                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                    >
                        Cancel
                    </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
