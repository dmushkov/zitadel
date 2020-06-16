import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, from, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { User } from 'src/app/proto/generated/auth_pb';
import {
    ProjectMemberSearchResponse,
    ProjectMemberView,
    ProjectState,
    ProjectType,
    ProjectView,
} from 'src/app/proto/generated/management_pb';
import { ProjectService } from 'src/app/services/project.service';
import { ToastService } from 'src/app/services/toast.service';

import {
    CreationType,
    MemberCreateDialogComponent,
} from '../../../modules/add-member-dialog/member-create-dialog.component';

@Component({
    selector: 'app-owned-project-contributors',
    templateUrl: './owned-project-contributors.component.html',
    styleUrls: ['./owned-project-contributors.component.scss'],
})
export class OwnedProjectContributorsComponent implements OnInit {
    @Input() public project!: ProjectView.AsObject;
    @Input() public projectType!: ProjectType;

    @Input() public disabled: boolean = false;

    public totalResult: number = 0;
    public membersSubject: BehaviorSubject<ProjectMemberView.AsObject[]>
        = new BehaviorSubject<ProjectMemberView.AsObject[]>([]);
    public ProjectState: any = ProjectState;
    private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private projectService: ProjectService,
        private dialog: MatDialog,
        private toast: ToastService,
        private router: Router) { }

    public ngOnInit(): void {
        console.log('project grant members');
        const promise: Promise<ProjectMemberSearchResponse> | undefined =
            this.projectType === ProjectType.PROJECTTYPE_OWNED ?
                this.projectService.SearchProjectMembers(this.project.projectId, 100, 0) :
                this.projectType === ProjectType.PROJECTTYPE_GRANTED ?
                    this.projectService.SearchProjectGrantMembers(this.project.projectId,
                        this.project.projectId, 100, 0) : undefined;
        if (promise) {
            from(promise).pipe(
                map(resp => {
                    this.totalResult = resp.toObject().totalResult;
                    return resp.toObject().resultList;
                }),
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false)),
            ).subscribe(members => {
                console.log(members);
                this.membersSubject.next(members);
            });
        }
    }

    public openAddMember(): void {
        const dialogRef = this.dialog.open(MemberCreateDialogComponent, {
            data: {
                creationType: CreationType.PROJECT_OWNED,
                projectId: this.project.projectId,
            },
            width: '400px',
        });

        dialogRef.afterClosed().subscribe(resp => {
            if (resp) {
                const users: User.AsObject[] = resp.users;
                const roles: string[] = resp.roles;

                if (users && users.length && roles && roles.length) {
                    Promise.all(users.map(user => {
                        return this.projectService.AddProjectMember(this.project.projectId, user.id, roles);
                    })).then(() => {
                        this.toast.showError('members added');
                    }).catch(error => {
                        this.toast.showError(error.message);
                    });
                }
            }
        });
    }

    public showDetail(): void {
        if (this.project?.state === ProjectState.PROJECTSTATE_ACTIVE) {
            this.router.navigate(['projects', this.project.projectId, 'members']);
        }
    }
}