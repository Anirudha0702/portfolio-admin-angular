import { inject, Injectable } from '@angular/core';
import {
  Firestore,
  doc,
  collection,
  getDocs,
  query,
  docData,
  addDoc,
  setDoc,
} from '@angular/fire/firestore';
import { IProject, IUser } from '../Types';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytesResumable,
} from '@angular/fire/storage';
@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor(private db: Firestore) {}
  storage = inject(Storage);
  getProjects(email: string) {
    const q = query(collection(this.db, 'Admins', email, 'projects'));
    return from(getDocs(q)).pipe(
      map((querySnapshot) => {
        const projects: IProject[] = [];
        querySnapshot.forEach((doc) => {
          projects.push({
            ...(doc.data() as IProject),
            id: doc.id,
          });
        });
        return projects;
      })
    );
  }
  getProject(email: string, id: string) {
    const docRef = doc(this.db, 'Admins', email, 'projects', id);
    return from(docData(docRef)).pipe(
      map((data) => {
        return {
          ...(data as IProject),
          id: docRef.id,
        };
      })
    );
  }
  async uploadToStorage(file: File) {
    console.log('uploading');
    const storageRef = ref(this.storage, 'uploads/projectSnaps' + file.name);
    console.log('starting');
    const upload = await uploadBytesResumable(storageRef, file);
    // if (upload.state === 'error') {
    //   console.log(upload.error);
    //   return null;
    // }
    console.log('done');
    return await getDownloadURL(upload.ref);
  }

  addToDb(email: string, project: any) {
    const collectionRef = collection(this.db, 'Admins', email, 'projects');
    return from(addDoc(collectionRef, project));
  }
  async createUser(user:IUser) {
    const collectionRef = collection(this.db, 'Admins');
    console.log("called")
    
      try {
        const res=await setDoc(doc(collectionRef,user.email), user);
      } catch (error) {
        console.log(error)
      }
    
  }
}
