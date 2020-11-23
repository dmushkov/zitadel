package eventstore

func NewWriteModel() *WriteModel {
	return &WriteModel{
		Events: []EventReader{},
	}
}

//WriteModel is the minimum representation of a command side view model.
// It implements a basic reducer
// it's purpose is to reduce events to create new ones
type WriteModel struct {
	AggregateID       string        `json:"-"`
	ProcessedSequence uint64        `json:"-"`
	Events            []EventReader `json:"-"`
	ResourceOwner     string        `json:"-"`
}

//AppendEvents adds all the events to the read model.
// The function doesn't compute the new state of the read model
func (rm *WriteModel) AppendEvents(events ...EventReader) *WriteModel {
	rm.Events = append(rm.Events, events...)
	return rm
}

//Reduce is the basic implementaion of reducer
// If this function is extended the extending function should be the last step
func (wm *WriteModel) Reduce() error {
	if len(wm.Events) == 0 {
		return nil
	}

	if wm.AggregateID == "" {
		wm.AggregateID = wm.Events[0].AggregateID()
	}
	if wm.ResourceOwner == "" {
		wm.ResourceOwner = wm.Events[0].ResourceOwner()
	}

	wm.ProcessedSequence = wm.Events[len(wm.Events)-1].Sequence()

	// all events processed and not needed anymore
	wm.Events = nil
	wm.Events = []EventReader{}
	return nil
}